import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Website } from 'paramorph/models';

interface Props {
  website : Website;
  page : Page;
  feed : Page[];
};

export default ({ website, page, feed } : Props) => (
  <div>
  { feed.map((page : Page) => {
    const Body = page.body;

    return (
      <article>
        <h1><Link to={ page.url }>{ page.title }</Link></h1>
        <Body website={ website } page={ page } />
        <p>
          <Link to={ page.url }>Read more</Link>
        </p>
      </article>
    );
  }) }
  </div>
);

