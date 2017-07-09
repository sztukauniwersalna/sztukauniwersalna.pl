import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Category, Tag, Website } from 'paramorph/models';

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
        <TagList website={ website } page={ page } />

        <Body website={ website } page={ page } respectLimit={ true } />

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
      .map(({ title, url } : Category, key : number) => (
        <li key={ key }><Link to={ url }>{ title }</Link></li>
      )) }
    </ul>
  );
}

const TagList = ({ website, page } : { website : Website, page : Page }) => {
  if (page.tags.length == 0) {
    return null;
  }

  return (
    <ul>
    { page.tags
      .map((title : string) => website.getTagOfTitle(title))
      .map(({ originalTitle, url } : Tag, key : number) => (
        <li key={ key }><Link to={ url }>{ originalTitle }</Link></li>
      )) }
    </ul>
  );
}

