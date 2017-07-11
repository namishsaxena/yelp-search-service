
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var sinon = require('sinon');
var Seneca = require('seneca');


var expect = chai.expect;

function test_seneca(callback) {
    return Seneca({log: 'test'}).test(callback).use(require('./../src/yelp_search_plugin'));
}

describe('yelp_search_plugin', function () {

    describe('role:yelp,cmd:search', function(){
        context('When passed with valid params', function(){
            it('returns a total param', function(callback){
                var seneca = test_seneca(callback);
                var searchRequest = {
                     "latitude": "50.943744",
                     "longitude": "6.940440",
                     "term": "restaurant"
                };
                seneca.act({
                    "role": "yelp",
                    "cmd" : "search",
                    "args" : {"body": JSON.stringify(searchRequest)}
                }, function(ignore, results){
                    expect(results).to.have.property("total");  
                    callback();
                });

            }); 
        });
        context('When passed with Invalid params', function(){
            it('returns with an error', function(callback){
                var seneca = test_seneca(callback);
                var searchRequest = {
                     "latitude": "50.943744",
                     "term": "restaurant"
                };
                seneca.act({
                    "role": "yelp",
                    "cmd" : "search",
                    "args" : {"body": JSON.stringify(searchRequest)}
                }, function(ignore, results){
                    expect(results).to.have.property("error"); 
                    callback();
                });

            }); 
        });        
    });

});