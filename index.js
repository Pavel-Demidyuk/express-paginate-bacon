//     express-paginate
//     Copyright (c) 2014- Nick Baugh <niftylettuce@gmail.com> (http://niftylettuce.com)
//     MIT Licensed

// Node.js pagination middleware and view helpers.

// * Author: [@niftylettuce](https://twitter.com/#!/niftylettuce)
// * Source: <https://github.com/niftylettuce/express-paginate>

var querystring = require('querystring');
var url = require('url');
var assign = require('lodash.assign');
var clone = require('lodash.clone');
var isObject = require('lodash.isobject');
var util = require('util');

exports = module.exports;

exports.href = function href(req) {

    return function (prev, params) {

        var query = clone(req.query);

        if (typeof prev === 'object') {
            params = prev;
            prev = false;
        } else {
            prev = (typeof prev === 'boolean') ? prev : false;
            query.page = prev ? query.page -= 1 : query.page += 1;
            query.page = (query.page < 1) ? 1 : query.page;
        }

        if (isObject(params))
            query = assign(query, params);

        return url.parse(req.originalUrl).pathname + '?' + querystring.stringify(query);

    };
};

exports.hasNext = function hasNext(req) {
    return function (pageCount) {
        if (typeof pageCount !== 'number' || pageCount < 0)
            throw new Error('express-paginate: `pageCount` is not a number >= 0');
        return req.query.page < pageCount;
    };
};

exports.getPages = function (req) {
    return function (itemCount) {

        var currentPage = req.query.page

        var pageCount = Math.ceil(itemCount / req.perPage)

        var maxPage = Math.ceil(itemCount / req.perPage);

        if (typeof itemCount !== 'number' || pageCount < 0)
            throw new Error('express-paginate: `itemCount` is not a number >= 0');

        var end = Math.min(Math.max(currentPage + Math.floor(maxPage / 2), maxPage), pageCount);
        var start = (currentPage < (maxPage - 1)) ? 1 : (end - maxPage) + 1;

        var pages = [];
        for (var i = start; i <= end; i++) {
            pages.push({
                number: i,
                url: exports.href(req)()
                    .replace('page=' + (currentPage + 1), 'page=' + i)
            });
        }
        return pages;
    }
}

exports.slice = function (req) {
    return function (data) {
        if (typeof data !== 'object') {
            return;
        }

        return data.slice(req.offset, req.end);
    }
}

exports.middleware = function middleware(perPage) {

    return function _middleware(req, res, next) {

        req.query.page = (typeof req.query.page === 'string') ? parseInt(req.query.page, 10) || 1 : 1;

        if (req.query.page < 1)
            req.query.page = 1;


        req.skip = req.offset = (req.query.page * perPage) - perPage;
        res.locals.paginate = {};
        req.end = req.offset + perPage;
        req.perPage = perPage;
        
        
        res.locals.paginate.perPage = perPage;
        res.locals.paginate.offset = req.skip;
        res.locals.paginate.skip = req.skip;
        res.locals.paginate.start = req.skip + 1;
        res.locals.paginate.currentPage = req.query.page;
        res.locals.paginate.href = exports.href(req);
        res.locals.paginate.hasPrevious = req.query.page > 1;
        res.locals.paginate.hasNext = exports.hasNext(req);
        res.locals.paginate.getPages = exports.getPages(req);

        next();

    };

};
