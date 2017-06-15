import * as React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Page, Category, Tag, Website } from 'paramorph/models';

interface Props {
  website : Website;
};

export default ({ website } : Props) => {
  const topLevel = Object.keys(website.pages)
    .map(key => website.pages[key])
    .filter(page => page.categories.length == 0)
    .filter(page => page.url != '/')
  ;
  const tags = Object.keys(website.tags)
    .map(key => website.tags[key]);

  return (
    <ul>
      <li>
        <Link to='/'>{ website.getPageOfUrl('/').title }</Link>
        <Branch pages={ topLevel.concat(tags) } />
      </li>
    </ul>
  );
};

interface BranchProps {
  pages : Page[];
}

const Branch = ({ pages } : BranchProps) : ReactElement<BranchProps> => (
  <ul>
  { pages
    .filter(page => page instanceof Category)
    .filter(page => page.output)
    .map(page => page as Category)
    .map(({ url, title, pages } : Category, key: number) => (
      <li key={ key }>
        <Link to={ url }>{ title }</Link>
        <Branch pages={ pages } />
      </li>
    ))
  }
  { pages
      .filter(page => !(page instanceof Category))
      .filter(page => page.output)
      .map(({ title, url } : Page, key: number) => (
        <li key={ key }>
          <Link to={ url }>{ title }</Link>
        </li>
      )) }
  </ul>
);

