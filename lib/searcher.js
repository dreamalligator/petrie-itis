'use strict';

const fetch = require('node-fetch');
const xml2js = require('xml2js');

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
   * @return {JSON} re-organized JSON blog ready for Petrie
   */
  formatData(raw) {
    return raw;
  }

  /**
   * @param {String} xmlString xml doc in string form
   * @return {JSON} parsed xml doc as JS object
   */
  parseXML(xmlString) {
    const xmlParser = new xml2js.Parser();
    let json;
    xmlParser.parseString(xmlString, function(err, data) {
      json = data;
    });
    return json;
  }

  /**
   * @param {String} term search term
   * @return {JSON} raw result from ITIS
   */
  queryITIS(term) {
    const body = JSON.stringify({ data: term });
    return fetch(`http://www.itis.gov/ITISWebService/services/ITISService/searchByScientificName?srchKey=${term}`, body)
      .then(response => response.text())
      .then(this.parseXML)
      .then(json => {
        this.raw = json;
        this.data = this.formatData(json);
      })
      .catch(reason => console.error(reason.message));
  }
}

module.exports =  ITISSearch;
