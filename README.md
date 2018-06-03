# Petrie ITIS

A simple wrapper to query the Integrated Taxonomic Information System ([ITIS](https://www.itis.gov)) database and format the result for [Petrie](https://github.com/nebulousdog/petrie).

## Usage

```javascript
const ITISSearcher = require('petrie-itis');
const nepenthes = new ITISSearcher('nepenthes');
```

This queries the ITIS database, saves the raw response, and caches the formatted data. There is a `refresh` convenience method to query the database again.

```javascript
{
  term: 'nepenthes',
  raw: [...],
  data: [...],
  refresh: function() {},
}
```

## License

MIT
