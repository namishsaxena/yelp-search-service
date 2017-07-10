'use strict'

var YelpSearchService = require('./yelp_search_service');
var searchService = new YelpSearchService();


module.exports = function (options) {
  var seneca = this;

  seneca.add({ "role": "search", "cmd": "home" }, function (args, done) {
    console.log(args)
    done(null, { result: 'hello' });
  });

  seneca.add({ "role": "search", "cmd": "fetch" }, function (args, done) {
    searchService.getSearchResults(JSON.parse(args.args.body)).then(function (results) {
      console.log(results.total);
      done(null, results);
    });
  });

};