
# express-paginate-bacon

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![MIT License][license-image]][license-url]
[![Slack][slack-image]][slack-url]

> Node.js pagination middleware and view helpers. Based on https://github.com/expressjs/express-paginate, but everything is better with a bacon.


## Install

```bash
npm install -S express-paginate-bacon
```

## Usage
Just provide *page=1* query parameter in the url.

## API

```js
var paginate = require('express-paginate-bacon');
```

### paginate.middleware(perPage)

That's it. No other arguments required. 

```js
// # app.js
var express = require('express');
var paginate = require('express-paginate-bacon');
var app = express();

// Keep this before all routes that will use pagination.
app.use(paginate.middleware(100));
```

### paginate.getPages(req)(resultsCount)

Get all the page urls.

### paginate.slice(req)(data)

Slices data for the current page.


## Frontend
*paginate* object is available in your template automagically. 

* paginate.perPage
* paginate.offset
* paginate.skip
* paginate.start
* paginate.currentPage
* paginate.href
        

## License


[MIT][license-url]


[npm-image]: https://img.shields.io/npm/v/express-paginate.svg?style=flat
[npm-url]: https://npmjs.org/package/express-paginate-bacon
[travis-image]: https://img.shields.io/travis/expressjs/express-paginate.svg?style=flat
[coveralls-image]: https://img.shields.io/coveralls/expressjs/express-paginate.svg?style=flat
[coveralls-url]: https://coveralls.io/r/expressjs/express-paginate?branch=master
[downloads-image]: http://img.shields.io/npm/dm/express-paginate.svg?style=flat
[downloads-url]: https://npmjs.org/package/express-paginate
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[slack-url]: http://slack.eskimo.io/
[slack-image]: http://slack.eskimo.io/badge.svg
