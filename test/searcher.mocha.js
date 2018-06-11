'use strict';

// test env
const expect = require('chai').expect;
// const sinon = require('sinon');
// const fetchMock = require('fetch-mock');

// fixtures
const itisByName = require('./fixtures/searchByScientificName.json');
const itisByTSN = require('./fixtures/getFullHierarchyFromTSN.json');

// subject
const ITISSearch = require('../lib/searcher');

describe('ITISSearch', function() {
  before(function() {
    // fetchMock.mock(/searchByScientificName/, itisByName);
    // fetchMock.mock(/getFullHierarchyFromTSN/, itisByTSN);
  });

  beforeEach(function() {
    // searcher = new ITISSearch('drosera');
  });

  after(function() {
    // fetchMock.restore();
  });

  context('#formatData', function() {
    it('works', function() {
      const formattedSpeciesList = ITISSearch.prototype.formatData(itisByTSN.hierarchyList, itisByName.scientificNames);
      const formattedSpecies = formattedSpeciesList[formattedSpeciesList.length - 1];
      expect(formattedSpecies.tsn).to.equal('896166');
      expect(formattedSpecies.rank).to.equal('Species');
      expect(formattedSpecies.taxon).to.equal('Drosera X woodii');
      expect(formattedSpecies.unitNames[1]).to.equal('woodii');
      expect(formattedSpecies.unitPrefixes[1]).to.equal('X');
    });
  });

  context('#queryITIS', function() {
    it('works', function() {

    });
  });

  context('#fetchByName', function() {
    it('works', function() {

    });
  });

  context('#fetchHierarchyByTSN', function() {
    it('works', function() {

    });
  });

  context('#refresh', function() {
    it('works', function() {

    });
  });

  context('#selectClosestSpecies', function() {

  });
});
