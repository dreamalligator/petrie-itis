'use strict';

// test env
const expect = require('chai').expect;
const sinon = require('sinon');
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

  context('#fetchHierarchyByTSN', function() {
    it('works', function() {
      const promise = ITISSearch.prototype.fetchHierarchyByTSN(22009);
      expect(promise).to.be.a('promise');
    });

    it('throws when given invalid input', function() {
      expect(function() {
        ITISSearch.prototype.fetchHierarchyByTSN();
      }).to.throw(TypeError);
    });
  });

  context('#fetchByName', function() {
    it('works', function() {
      const promise = ITISSearch.prototype.fetchByName('drosera');
      expect(promise).to.be.a('promise');
    });

    it('throws when given invalid input', function() {
      expect(function() {
        ITISSearch.prototype.fetchByName();
      }).to.throw(TypeError);
    });
  });

  context.skip('#queryITIS', function() {
    it('works', function() {

    });

    it('throws when given invalid input', function() {
      expect(function() {
        console.debug(ITISSearch.prototype.queryITIS());
      }).to.throw(TypeError);
    });
  });

  context('#refresh', function() {
    before(function() {
      sinon.stub(ITISSearch.prototype, 'queryITIS').calledWith('cat');
    });

    after(function() {
      ITISSearch.prototype.queryITIS.restore();
    });

    it('works', function() {
      ITISSearch.prototype.refresh();
      expect(ITISSearch.prototype.queryITIS.calledOnce).to.be.true;
    });
  });

  context('#selectClosestSpecies', function() {
    it('works', function() {
      const species = ITISSearch.prototype.selectClosestSpecies('drosera', itisByName.scientificNames);
      expect(species.tsn).to.equal('22009');
    });

    it('throws when given invalid input', function() {
      expect(function() {
        ITISSearch.prototype.selectClosestSpecies();
      }).to.throw(TypeError);

      expect(function() {
        ITISSearch.prototype.selectClosestSpecies('term');
      }).to.throw(TypeError);
    });
  });
});
