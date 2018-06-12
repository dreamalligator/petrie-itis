# [Petrie ITIS](https://github.com/nebulousdog/petrie-itis)

![build](https://travis-ci.org/nebulousdog/petrie-itis.svg?branch=master)
![coverage](https://coveralls.io/repos/github/nebulousdog/petrie-itis/badge.svg?branch=master)
![vulnerabilities](https://snyk.io/test/github/nebulousdog/petrie-itis/badge.svg?targetFile=package.json)

A simple wrapper to query the Integrated Taxonomic Information System ([ITIS](https://www.itis.gov)) database and format the result for [Petrie](https://github.com/nebulousdog/petrie) using the [ITIS API endpoints](https://www.itis.gov/ws_description.html).

## Usage

```javascript
const ITISSearcher = require('petrie-itis');
const nepenthes = new ITISSearcher('nepenthes');
```

This queries the ITIS database, saves the raw response, and caches the formatted data. There is a `refresh` convenience method to query the database again in case there was a network error.

## Getting started

* YARN:

  `yarn add petrie petrie-itis`

* NPM:

  `npm install petrie petrie-itis`

## Contributing

Feel free to clone the repo and make a PR!

`git clone git@github.com:nebulousdog/petrie-itis.git`

## Tests

Run tests with `yarn test`.

## License

MIT
