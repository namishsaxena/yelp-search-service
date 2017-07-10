'use strict'

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
//var sinon = require('sinon');
var config = require('config');
var yelpAuthConfig = config.get('yelp.authConfig');

var expect = chai.expect;

var YelpSearchService = require('./../src/yelp_search_service');

describe('yelpsearch', function(){
    var subject = new YelpSearchService();

    describe('requestAccessToken', function() {
        context('With valid clientId and secret', function() {
            it('returns a valid access token', function() {
                subject.requestAccessToken().then(function(response){
                    expect(response.access_token).to.be.not.null();
                });
            })
        });
        /*
        context('With invalid clientId and secret', function(){
            it('returns an error', function(){
                expect(subject.getAccessToken('abc','def')).to.be.rejectedWith(Error);
            });
        });  */
    });

    describe('getSearchResults', function() {
/*
        beforeEach(function() {
            sinon.stub(subject,'getSearchResults').callsFake(function(searchRequest) {
                var searchResults = {
                    "total" : 30
                };
                return searchResults;                
            });
        });

        afterEach(function() {
            subject.getSearchResults.restore();
        });
*/
        context('With Latitude and Longitude', function() {
            it('returns a list of restaurants', function() {
                var searchRequest = {
                     "latitude": "50.943744",
                     "longitude": "6.940440",
                     "term": "restaurant"
                }
                subject.getSearchResults(searchRequest).then(function(response) {
                    expect(parseInt(response.total)).to.be.gte(0);
                });
                
            });
        });

    });

});