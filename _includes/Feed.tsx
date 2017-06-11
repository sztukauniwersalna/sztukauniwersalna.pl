import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Category, Website } from 'paramorph/models';

interface Props {
  website : Website;
  page : Page;
  feed : Page[];
};

export default ({ website, page, feed } : Props) => (
  <div>
  { feed.map((page : Page, key : number) => {
    const Body = page.body;

    return (
      <article key={ key }>
        <h1><Link to={ page.url }>{ page.title }</Link></h1>
        <CategoryList website={ website } page={ page } />

        <Body website={ website } page={ page } />

        <Link to={ page.url }>Read more</Link>
      </article>
    );
  }) }
  </div>
);

const CategoryList = ({ website, page } : { website : Website, page : Page }) => {
  if (page.categories.length == 0) {
    return null;
  }

  return (
    <ul>
    { page.categories
      .map((title : string) => website.getCategoryOfTitle(title))
      .map((c : Category, key : number) => (
        <li key={ key }><Link to={ c.url }>{ c.title }</Link></li>
      )) }
    </ul>
  );
}

