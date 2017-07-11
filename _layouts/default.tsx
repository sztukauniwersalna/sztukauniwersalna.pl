import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Website, MenuEntry } from 'paramorph/models';
import Crumbs from '../_includes/Crumbs'
import TagList from '../_includes/TagList'

interface Props {
  website : Website;
  page : Page;
}

export function DefaultLayout({ website, page } : Props) {
  const Body = page.body;
  const index = website.getPageOfUrl('/');

  return (
    <div>
      <header>
        <nav>
          <ul>
          { website.menu.map((entry : MenuEntry, key : number) => (
            <li key={ key }><Link to={ entry.url }>{ entry.short }</Link></li>
          )) }
          </ul>
        </nav>
      </header>
      <main>
        <h1><Link to={ page.url }>{ page.title }</Link></h1>
        <Crumbs website={ website } page={ page } />
        <TagList website={ website } page={ page } />
        <Body website={ website } page={ page } />
      </main>
      <footer>
        <ul>
        { website.menu.map((entry : MenuEntry, key : number) => (
          <li key={ key }><Link to={ entry.url }>{ entry.title }</Link></li>
        )) }
        </ul>
        <p>
          <Link to={ index.url }>{ index.title }</Link> | <Link to="/sitemap">Site Map</Link>
        </p>
      </footer>
    </div>
  );
}

export default DefaultLayout;

