import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Category, Website } from 'paramorph/models';

interface Props {
  website : Website;
};

export default ({ website } : Props) => (
  <ul>
    <li>
      <Link to='/'>{ website.getPageOfUrl('/').title }</Link>
      <ul>
      { Object.keys(website.categories)
        .map((key : string) => website.categories[key])
        .map(({ url, title, pages } : Category, key: number) => (
        <li key={ key }>
          <Link to={ url }>{ title }</Link>
          <ul>
          { pages.map(({ title, url } : Page, key: number) => (
            <li key={ key }><Link to={ url }>{ title }</Link></li>
          )) }
          </ul>
        </li>
      )) }
      { Object.keys(website.pages)
          .map((key : string) => website.pages[key])
          .filter((page : Page) => page.categories.length == 0)
          .filter((page : Page) => !(page instanceof Category))
          .filter((page : Page) => ['/', '/404'].indexOf(page.url) === -1)
          .map(({ title, url } : Page, key: number) => (
            <li key={ key }><Link to={ url }>{ title }</Link></li>
          )) }
      </ul>
    </li>
  </ul>
);

