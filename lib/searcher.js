'use strict';

const fetch = require('node-fetch');

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
    this.queryITIS(term);
  }

  /**
   * @param {JSON} raw raw data received from ITIS
   * @return {undefined}
   */
  formatData(raw) {
    this.data = raw;
  }

  /**
   * @param {String} term search term
   * @return {Promise<JSON>}
   */
  queryITIS(term) {
    return fetch(`https://www.itis.gov/ITISWebService/jsonservice/ITISService/searchByScientificName?srchKey=${term}`)
      .then(response => response.json())
      .then(json => {
        this.raw = json;
        this.formatData(this.raw);
        return json;
      })
      .catch(reason => console.error(reason.message));
  }
}

module.exports =  ITISSearch;
