'use strict'


var dotEnvPath = __dirname+ '/../.env';
require('dotenv').config({path:dotEnvPath});

var rp = require('request-promise');


function YelpSearchService() { }

YelpSearchService.prototype.requestAccessToken = function (clientId, clientSecret) {

    if (clientId === undefined) {
        clientId = process.env.YELP_AUTH_CONFIG_CLIENT_ID;
    }

    if (clientSecret === undefined) {
        clientSecret = process.env.YELP_AUTH_CONFIG_CLIENT_SECRET;
    }

    var options = {
        method: 'POST',
        uri: process.env.YELP_AUTH_CONFIG_ENDPOINT,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: process.env.YELP_AUTH_CONFIG_GRANT_TYPE
        },
        resolveWithFullResponse: true,
        json: true
    };
    return rp(options).then(function (response) {
        return response.body;
    }).catch(function (error) {
        throw error;
    });
};


YelpSearchService.prototype.getSearchResults = function (searchRequest) {
    var searchEndpoint = process.env.YELP_SEARCH_CONFIG_ENDPOINT;
    return this.requestAccessToken().then(function (response) {
        var options = {
            method: 'GET',
            uri:  searchEndpoint,
            headers: {
                authorization: response.token_type + " " + response.access_token
            },
            qs: searchRequest,
            resolveWithFullResponse: true,
            json: true
        };
        return rp(options).then(function (searchResponse) {
            return searchResponse.body;
        }).catch(function (error) {
            throw error;
        });
    }).catch(function (error) {
        throw error;
    });
};

module.exports = YelpSearchService;