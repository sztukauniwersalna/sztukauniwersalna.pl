import { createElement } from 'react';
import { render } from 'react-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Route, StaticRouter, BrowserRouter } from 'react-router-dom';

import Root from './components/Root';
import DefaultLayout from './components/layouts/DefaultLayout';
import routesConfig from '../routes-config';

const routes = routesConfig.map((config : any, key : number) => {
  return createElement(Route, Object.assign({ key: key }, config));
});

const serverRender = (locals : any) => {
  // site skeleton rendered without react ids
  const root = createElement(Root, locals);
  const html = renderToStaticMarkup(root);

  // react root contents rendered with react ids
  const layout = createElement(DefaultLayout, {}, routes);
  const router = createElement(StaticRouter, { location: locals.path, context: {}}, layout);
  const body = renderToString(router);

  // everything together
  return '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
}

const clientRender = () => {
  render(
    createElement(BrowserRouter, {}, createElement(DefaultLayout, {}, routes)),
    document.getElementById('root')
  );
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', clientRender);
}

export default serverRender;

