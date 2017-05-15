import * as React from 'react';
import { Link } from 'react-router-dom';

import Page from '../src/models/Page';
import MenuEntry from '../src/models/MenuEntry';

interface Props {
  page : Page;
  menu : MenuEntry[];
};

export default ({ page, menu } : Props) => (
  <div>
    <nav>
      <ul>
      { menu.map((entry : MenuEntry, key : number) => (
        <li key={ key }><Link to={ entry.url }>{ entry.short }</Link></li>
      )) }
      </ul>
    </nav>
    <header>
      <h1>{ page.title }</h1>
      <div dangerouslySetInnerHTML={ { __html: page.body } } />
    </header>
    <main>
    </main>
    <footer>
      { menu.map((entry : MenuEntry, key : number) => (
        <li key={ key }><Link to={ entry.url }>{ entry.title }</Link></li>
      )) }
    </footer>
  </div>
);

