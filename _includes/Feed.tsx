import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Website } from 'paramorph/models';

import Tags from 'parrot-layout/Tags';
import Button from 'parrot-layout/Button';
import { Branch as TocBranch } from 'includes/TableOfContents';

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
        <Tags website={ website } page={ page } />

        <Body website={ website } page={ page } respectLimit={ true } />

        <Button url={ page.url } variant='raised' color='purple'>Read More</Button>
      </article>
    );
  }) }
    </div>
  );
}

export default Feed;

