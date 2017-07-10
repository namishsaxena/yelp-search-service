'use strict'

var Seneca = require('seneca');
var SenecaWeb = require('seneca-web');
var Express = require('express');
  var bodyParser = require('body-parser');
var seneca = Seneca();


seneca.use('./yelp_search_plugin.js',{});
//seneca.listen({"type": "http", "port": 8080}); 

var Routes = [{
  pin: 'role:search,cmd:*',
  prefix: '/api',
  map: {
    home: {
      GET: true
    },
    fetch: {
      POST: true
    },
  }
}]

seneca.use(SenecaWeb, {
  routes: Routes,  
  context: Express(),
  adapter: require('seneca-web-adapter-express')
})

seneca.ready(() => {
  var app = seneca.export('web/context')()
  app.use(bodyParser.json());
  app.listen('3000', () => {
      console.log('server listening on port 3000')
  })
})