var React = require('react');
var ReactDom = require('react-dom/server');
var Route = require('react-router').Route;

var Root = require('./components/StaticRoot').default;
var DefaultLayout = require('./components/layouts/DefaultLayout').default;
var routesConfig = require('../routes-config').default;

module.exports = function render(locals, callback) {
  var routes = routesConfig.map(function(config, key) {
    console.log(config);
    return React.createElement('Route', Object.assign({ key: key }, config));
  });
  var layout = React.createElement(DefaultLayout, {}, routes);

  var html = ReactDom.renderToString(React.createElement(Root, locals, layout));
  callback(null, '<!DOCTYPE html>' + html);
}

