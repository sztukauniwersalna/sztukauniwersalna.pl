import * as React from 'react';
import { Link } from 'react-router-dom';

interface PageConfig {
  title : string;
  body : string;
}

interface LinkConfig {
  title : string;
  short : string;
  url : string;
  icon : string;
}

interface Props {
  page : PageConfig;
  links : LinkConfig[];
};

export default ({ page, links } : Props) => (
  <div>
    <nav>
      <ul>
      { links.map((link : LinkConfig, key : number) => (
        <li key={ key }><Link to={ link.url }>{ link.short }</Link></li>
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
      { links.map((link : LinkConfig, key : number) => (
        <li key={ key }><Link to={ link.url }>{ link.title }</Link></li>
      )) }
    </footer>
  </div>
);

