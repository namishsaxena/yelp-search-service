'use strict'


var YelpSearchService = require('./../src/yelp_search_service');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var sinon = require('sinon');

var expect = chai.expect;


var subject = new YelpSearchService();
describe('yelpsearch', function(){
    console.log('endpoint in test '+process.env.YELP_SEARCH_CONFIG_ENDPOINT);

    describe('requestAccessToken', function() {
        context('With valid clientId and secret', function() {
            it('returns a valid access token', function() {
                return expect(Promise.resolve(subject.requestAccessToken())).to.be.not.null;
            })
        });
        
        context('With invalid clientId and secret', function(){
            it('returns an error', function(){
                expect(Promise.resolve(subject.requestAccessToken('abc','def'))).to.be.rejectedWith(Error);
            });
        });
    });

    describe('getSearchResults', function() {
        context('With Proper location parameters', function() {
            it('returns a list of restaurants', function() {
                var searchRequest = {
                     "latitude": "50.943744",
                     "longitude": "6.940440",
                     "term": "restaurant"
                };
                return expect(Promise.resolve(subject.getSearchResults(searchRequest))).to.eventually.have.property("total");  
                
            });
        });
        context('With missing  parameters', function() {
            it('returns a list of restaurants', function() {
                var searchRequest = {
                     "latitude": "50.943744",
                     "term": "restaurant"
                };
                return expect(Promise.resolve(subject.getSearchResults(searchRequest))).to.be.rejectedWith(Error);  
                
            });
        });        

    });

});