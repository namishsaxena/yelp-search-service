var Seneca = require('seneca');
var SenecaWeb = require('seneca-web');
var Express = require('express');
var bodyParser = require('body-parser')
var seneca = Seneca();

var searchServicePlugin = require('./src/yelp_search_plugin.js',{});
var Routes = [{
  pin: 'role:yelp,cmd:*',
  prefix: '/api/yelp',
  map: {
    search: {
      POST: true
    },
  }
}];
var app = Express();
app.use(bodyParser.json({ type: 'application/*+json' }))
app.set('port', (process.env.SERVER_PORT || 8080));

var config = {
  routes: Routes,
  adapter: require('seneca-web-adapter-express'),
  context: app
};


seneca.use(searchServicePlugin);
seneca.use(SenecaWeb,config);
seneca.ready(() => {
  var server = seneca.export('web/context')();
  server.listen(app.get('port') , (error) => {
      console.log(error || 'server started on: '+app.get('port'));
  });
});