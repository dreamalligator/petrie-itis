'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const fetchMock = require('fetch-mock');
const ITISSearch = require('../lib/searcher');

const itisJSON = require('./fixtures/searchByScientificNameDrosera.json');

describe('ITISSearch', function() {
  context('#formatData', function() {
    it('works', function() {

    });
  });

  context('#queryITIS', function() {
    before(function() {
      fetchMock.mock('*', itisJSON);
    });

    after(function() {
      fetchMock.restore();
    });

    it('works', function() {
      const droseraPromise = ITISSearch.prototype.queryITIS('drosera');
      droseraPromise.then(function(json) {
        expect(json).to.equal(itisJSON);
      });
    });
  });

  context('#refresh', function() {
    before(function() {
      sinon.spy(ITISSearch.prototype, 'queryITIS');
    });

    after(function() {
      ITISSearch.prototype.queryITIS.restore();
    });

    it('works', function() {
      ITISSearch.prototype.refresh();
      expect(ITISSearch.prototype.queryITIS.calledOnce).to.be.true;
    });
  });
});
