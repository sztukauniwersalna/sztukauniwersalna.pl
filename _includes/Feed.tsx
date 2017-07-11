import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Website } from 'paramorph/models';

import CategoryList from './CategoryList';
import TagList from './TagList';
import { Branch as TocBranch } from './TableOfContents';

export interface Props {
  website : Website;
  page : Page;
  feed : Page[];
  respectLimit ?: boolean;
};

export function Feed({ website, page, feed, respectLimit = false, ...props } : Props) {
  if (respectLimit) {
    return <TocBranch pages={ feed } shallow { ...props } />;
  }

  return (
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
}

export default Feed;

