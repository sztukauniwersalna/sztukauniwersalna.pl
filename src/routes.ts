import { createElement } from 'react';
import { Route } from 'react-router-dom';

import config from './config';
import { Layout } from './models';

interface Routable {
  url : string;
  title : string;
  layout : Layout;
  exact ?: boolean;
}

const NOT_FOUND_URL = '/404';

let key = 0;

function createRoute(routable : Routable) {
  console.log(routable);
  const componentProps = Object.assign({}, config, { page: routable })
  const component = createElement(routable.layout.component as any, componentProps);
  const routeProps = { path: routable.url, exact: routable.exact != false, key: key++ };
  const route = createElement(Route, routeProps, component);
  return route;
}

const routes = [].concat.call(
  // categories
  Object.keys(config.categories)
    .map((url) => createRoute(config.categories[url])),

  // pages
  Object.keys(config.pages)
    .map((url) => createRoute(config.pages[url])),
);

var error404 = config.pages[NOT_FOUND_URL];
if (error404 == undefined) {
  throw new Error(`couldn't find page of url ${NOT_FOUND_URL}`);
}

// not found page
routes.push(createRoute({
  url: '/',
  exact: false,
  layout: error404.layout,
  title: 'Not Found',
}));

export default routes;

