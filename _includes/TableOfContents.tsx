import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Category, Website } from 'paramorph/models';

interface Props {
  website : Website;
};

export default ({ website } : Props) => (
  <div>
  { Object.keys(website.categories)
    .map((key : string) => website.categories[key])
    .map(({ url, title, pages } : Category, key: number) => (
    <div key={ key }>
      <h2>
        <Link to={ url }>{ title }</Link>
      </h2>
      <ul>
      { pages.map(({ title, url } : Page, key: number) => (
        <li key={ key }><Link to={ url }>{ title }</Link></li>
      )) }
      </ul>
    </div>
  )) }
  </div>
);

