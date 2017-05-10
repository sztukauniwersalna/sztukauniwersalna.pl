import { createElement } from 'react';
import { Route } from 'react-router-dom';
import * as marked from 'marked';

const config = require('../_config.yml');
const context = require('./requireContext');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

const DEFAULT_LAYOUT_NAME = 'default';

const layouts : any = {};

requireDirectory(context.LAYOUT)
  .forEach((file : any) => {
    layouts[file.name.replace(/^\.\//, '').replace(/\.tsx$/, '')] = file.default;
  });

const routes = [].concat.apply(
  // top level pages
  requireDirectory(context.ROOT).map(createRoute({})),

  // pages from collections
  Object.keys(config.collections)
  .filter((key : string) => context.hasOwnProperty(key.toUpperCase()))
  .map((key : string) => {
    return requireDirectory(context[key.toUpperCase()]).map(createRoute(config.collections[key]));
  }),
);

export default routes;

function createRoute(parent : any) {
  return (file : any, key: number) => {
    const layoutName = file.attributes.layout || parent.layout || DEFAULT_LAYOUT_NAME;
    if (!layouts.hasOwnProperty(layoutName)) {
      throw new Error(`couldn't find layout of name ${layoutName}; please add it to _layouts/`);
    }

    const componentProps = Object.assign({}, file, { body: marked(file.body) }, config);
    const component = createElement(layouts[layoutName], componentProps);

    const routeProps = {
      path: file.attributes.permalink || file.name.replace(/\.markdown$/, ''),
      exact: true,
      key : key,
    };
    var route = createElement(Route, routeProps, component);
    return route;
  };
}

function requireDirectory(context : any) : any[] {
  return context.keys()
    .map((name : string) => {
      const file = context(name) as any;
      file.name = name;
      return file;
    });
}

