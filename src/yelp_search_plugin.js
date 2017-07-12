var YelpSearchService = require("./yelp_search_service");
var searchService = new YelpSearchService();


module.exports = function (options) {
    var seneca = this;

    seneca.add({ "role": "yelp", "cmd": "search" }, function (args, done) {
        searchService.getSearchResults(JSON.parse(args.args.body)).then(function (results) {
            done(null, results);
        }).catch(function (error) {
            if (error.statusCode >= 400 || error.statusCode <= 499) {
                done(null, { "error": error.message });
            } else {
                done(null, { "error": error.message });
            }

        });
    });
};