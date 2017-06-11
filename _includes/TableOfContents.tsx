import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Category, Tag, Website } from 'paramorph/models';

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
        .filter((category : Category) => category.output)
        .map(({ url, title, pages } : Category, key: number) => (
        <li key={ key }>
          <Link to={ url }>{ title }</Link>
          <ul>
          { pages.filter((page : Page) => page.output)
            .map(({ title, url } : Page, key: number) => (
            <li key={ key }><Link to={ url }>{ title }</Link></li>
          )) }
          </ul>
        </li>
      )) }
      { Object.keys(website.pages)
          .map((key : string) => website.pages[key])
          .filter((page : Page) => page.categories.length == 0)
          .filter((page : Page) => page.output)
          .filter((page : Page) => page.url != '/')
          .map(({ title, url } : Page, key: number) => (
            <li key={ key }><Link to={ url }>{ title }</Link></li>
          )) }
      { Object.keys(website.tags)
          .map((key : string) => website.tags[key])
          .filter((tag : Tag) => tag.output)
          .map(({ title, url } : Tag, key: number) => (
            <li key={ key }><Link to={ url }>{ title }</Link></li>
          )) }
      </ul>
    </li>
  </ul>
);

