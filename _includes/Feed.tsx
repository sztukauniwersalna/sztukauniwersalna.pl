import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Website } from 'paramorph/models';

import Tile from 'parrot-layout/Tile';
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
      { feed.map(page => (<Tile key={ page.url } page={ page } website={ website } />)) }
    </div>
  );
}

export default Feed;

