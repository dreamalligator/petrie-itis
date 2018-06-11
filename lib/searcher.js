'use strict';

const fetch = require('node-fetch');
const levenshtein = require('fast-levenshtein');

/**
* A class to be initialized with a search term.
 *
 * @example
 *
 *   const ITISSearch = require('./index.js');
 *   const result = new ITISSearch('nepenthes');
 */
class ITISSearch {
  /**
   * @param {String} term ITIS search term
   */
  constructor(term) {
    this.term = term;
    this.data = this.queryITIS(term);
  }

  /**
   * @param {String} name name to search by
   * @return {Promise<JSON>} data from endpoint
   */
  fetchByName(name) {
    if (typeof name !== 'string') {
      throw new TypeError('expected name to be a string.');
    }

    const url = `https://www.itis.gov/ITISWebService/jsonservice/ITISService/searchByScientificName?srchKey=${name}`;

    return fetch(url)
      .then(response => response.json())
      .catch(reason => console.error(reason.message));
  }

  /**
   * @param {String} tsn ITIS taxonomic serial name (TSN).
   *   @see https://www.itis.gov/pdf/faq_itis_tsn.pdf
   * @return {Promise<JSON>} data from endpoint
   */
  fetchHierarchyByTSN(tsn) {
    if (['string', 'number'].indexOf(typeof tsn) === -1) {
      throw new TypeError('expected tsn to be a string or number.');
    }

    const url = `https://www.itis.gov/ITISWebService/jsonservice/ITISService/getFullHierarchyFromTSN?tsn=${tsn}`;

    return fetch(url)
      .then(response => response.json())
      .catch(reason => console.error(reason.message));
  }

  /**
   * This method formats the raw data from ITIS to be used to instantiate
   * Species in Petrie. The Species class extends the GraphVertex.
   *
   * @see https://github.com/nebulousdog/petrie/blob/master/lib/species.js
   * @see https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/graph/GraphVertex.js
   *
   * @param {Object} hierarchyList raw hierarchy response from ITIS endpoint
   * @param {Object} scientificNames raw scientific-name response from ITIS endpoint
   * @return {Object[]} formatted data
   */
  formatData(hierarchyList, scientificNames) {
    const speciesList = hierarchyList.map(function(s) {
      return {
        // bookkeeping if later we want to keep track of updating from many
        // databases
        databases: {
          itis: s['tsn'],
        },
        // I dont have a universal id scheme yet, so just going to go with
        // TSN IDs for now..
        tsn: s['tsn'],
        parentId: s['parentTsn'],
        rank: s['rankName'],
        taxon: s['taxonName'],
      };
    });

    // TODO: this could at least pop off chosen species to make each successive
    // find slightly faster.
    speciesList.forEach(function(species) {
      const info = scientificNames.find(info => info['tsn'] === species['tsn']);
      if (info) {
        Object.assign(species, {
          // combinedName: info['combinedName'], // always same as taxon name?
          kingdom: info['kingdom'],
          // binomial name, subspecies, and hybrid names as applicable
          unitNames: [
            info['unitName1'],
            info['unitName2'],
            info['unitName3'],
            info['unitName4'],
          ],
          // for example; "X" for hybrid, "var." for variety.
          unitPrefixes: [
            info['unitInd1'],
            info['unitInd2'],
            info['unitInd3'],
            info['unitInd4'],
          ],
        });
      }
    });

    return speciesList;
  }

  /**
   * @async
   * @param {String} term search term
   * @return {Object[]} formatted species vertex infos
   */
  async queryITIS(term) {
    if (typeof term !== 'string') {
      throw TypeError('expected term to be a string.');
    }

    const scientificNames = (await this.fetchByName(term)).scientificNames;
    const species = this.selectClosestSpecies(term, scientificNames);
    const hierarchyList = (await this.fetchHierarchyByTSN(species.tsn)).hierarchyList;
    return this.formatData(hierarchyList, scientificNames);
  }

  /**
   * refreshes the query. primary use-case would be due to network issues since
   * it isnt likely ITIS will give different results.
   * @return {undefined}
   */
  refresh() {
    this.data = this.queryITIS(this.term);
  }

  /**
   * @param {String} term primary search term
   * @param {Object[]} scientificNames list of species by scientific name
   * @return {Object} species
   */
  selectClosestSpecies(term, scientificNames) {
    if (typeof term !== 'string' || !Array.isArray(scientificNames)) {
      throw TypeError('selectClosestSpecies given improper input.');
    }

    return scientificNames.reduce(function(memoizedSpecies, species) {
      const newDistance = levenshtein.get(term, species.combinedName);
      const oldDistance = levenshtein.get(term, memoizedSpecies.combinedName);
      return newDistance < oldDistance ? species : memoizedSpecies;
    });
  }
}

module.exports =  ITISSearch;
