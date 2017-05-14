import * as React from 'react';
import { Link } from 'react-router-dom';

interface LinkDef {
  title : string;
  short : string;
  url : string;
  icon : string;
}

interface Props {
  title : string;
  body : string;
  links : LinkDef[];
};

export default ({ title, body, links } : Props) => (
  <div>
    <nav>
      <ul>
      { links.map((link : LinkDef, key : number) => (
        <Link to={ link.url } key={ key }>{ link.short }</Link>
      )) }
      </ul>
    </nav>
    <header>
      <h1>{ title }</h1>
      <div dangerouslySetInnerHTML={ { __html: body } } />
    </header>
    <main>
    </main>
    <footer>
      { links.map((link : LinkDef, key : number) => (
        <Link to={ link.url } key={ key }>{ link.title }</Link>
      )) }
    </footer>
  </div>
);

