'use strict';

const fs = require('fs');
const fetchMock = require('fetch-mock');
const jsdom = require('jsdom');
const ITISSearch = require('../lib/searcher');

global.window = (new jsdom.JSDOM()).window;
const itisXML = fs.readFile('./fixtures/searchByScientificNameDrosera.xml');

describe('ITISSearch', function() {
  context('#formatData', function() {
    it('works', function() {

    });
  });

  context('#queryITIS', function() {
    before(function() {
      fetchMock.mock('*', itisXML);
    });

    after(function() {
      fetchMock.restore();
    });

    it('works', function() {
      const droseraResult = new ITISSearch('drosera');
      expect(droseraResult).to.equal(itisXML);
    });
  });
});
