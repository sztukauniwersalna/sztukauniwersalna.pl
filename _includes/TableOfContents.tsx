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
      <li key={ -1 }>
        <Link to='/'>{ website.getPageOfUrl('/').title }</Link>
        <Branch pages={ topLevel } />
      </li>
    { tags.map(({ title, url, pages }: Tag, key : number) => (
      <li key={ key }>
        <Link to={ url }>{ title }</Link>
        <Branch pages={ pages } shallow />
      </li>
    )) }
    </ul>
  );
};

interface BranchProps {
  pages : Page[];
  shallow ?: boolean;
}

const Branch = ({ pages, shallow = false } : BranchProps) : ReactElement<BranchProps> => (
  <ul>
  { pages
    .filter(page => page instanceof Category)
    .filter(page => page.output)
    .map(page => page as Category)
    .map(({ url, title, pages } : Category, key: number) => (
      <li key={ key }>
        <Link to={ url }>{ title }</Link>
        { !shallow ? <Branch pages={ pages } /> : null }
      </li>
    ))
  }
  { pages
      .filter(page => !(page instanceof Category))
      .filter(page => page.output)
      .map(({ title, url } : Page, key: number) => (
        <li key={ 1024 * 1024 + key }>
          <Link to={ url }>{ title }</Link>
        </li>
      )) }
  </ul>
);

