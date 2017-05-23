import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, MenuEntry, PageConfig } from '../src/models';

export default (config : PageConfig) => (
  <div>
    <nav>
      <ul>
      { config.menu.map((entry : MenuEntry, key : number) => (
        <li key={ key }><Link to={ entry.url }>{ entry.short }</Link></li>
      )) }
      </ul>
    </nav>
    <header>
      <h1>{ config.page.title }</h1>
      <div dangerouslySetInnerHTML={ { __html: config.page.body() } } />
    </header>
    <main>
    </main>
    <footer>
      <ul>
      { config.menu.map((entry : MenuEntry, key : number) => (
        <li key={ key }><Link to={ entry.url }>{ entry.title }</Link></li>
      )) }
      </ul>
      <p>
        <Link to="/">{ config.title }</Link> | <Link to="/sitemap">Site Map</Link>
      </p>
    </footer>
  </div>
);

