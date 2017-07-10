'use strict'

var config = require('config');
var rp = require('request-promise');


function YelpSearchService() { }

YelpSearchService.prototype.requestAccessToken = function() {
    return this.getAccessToken().then(function (response) {
        return response.body;
    });
}


YelpSearchService.prototype.getAccessToken = function () {
    var yelpAuthConfig = config.get('yelp.authConfig');
    var options = {
        method: 'POST',
        uri: yelpAuthConfig.endpoint,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            client_id: yelpAuthConfig.clientId,
            client_secret: yelpAuthConfig.clientSecret,
            grant_type: yelpAuthConfig.grantType
        },
        resolveWithFullResponse: true,
        json: true
    };
    return rp(options);
};


YelpSearchService.prototype.getSearchResults = function(searchRequest) {
    console.log('in service');
    console.log(searchRequest)
     console.log('starting now');
    var yelpSearchConfig = config.get('yelp.searchConfig');
    var bearerToken = "Bearer ";
    return this.requestAccessToken().then(function(response) {
        bearerToken += response.access_token;
        var options = {
            method: 'GET',
            uri: yelpSearchConfig.endpoint,
            headers: {
                authorization: bearerToken
            },
            qs: searchRequest,
            resolveWithFullResponse: false,
            json: true
        };
        return rp(options);
    });
};


module.exports = YelpSearchService;