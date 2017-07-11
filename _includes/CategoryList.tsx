import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Category, Website } from 'paramorph/models';

export interface Props {
  website : Website,
  page : Page,
}

export function CategoryList({ website, page } : Props) {
  if (page.categories.length == 0) {
    return null;
  }

  return (
    <ul>
    { page.categories
      .map((title : string) => website.getCategoryOfTitle(title))
      .map(({ title, url } : Category, key : number) => (
        <li key={ key }><Link to={ url }>{ title }</Link></li>
      )) }
    </ul>
  );
}

export default CategoryList;

