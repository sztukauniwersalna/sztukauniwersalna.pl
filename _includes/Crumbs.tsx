import * as React from 'react';
import { Page, Website } from 'paramorph/models';
import { Link } from 'react-router-dom';

interface Props {
  website : Website;
  page : Page;
}

export function Crumbs({ website, page } : Props) {
  return (
    <div>
  { page.getCrumbs(website)
    .map((crumbs : Page[], key : number) => (
      <div key={ key }>
      { crumbs.map((page : Page, key : number) => (
        <span key={ key }>{ key? ' → ' : '' }<Link to={ page.url }>{ page.title }</Link></span>
      )) }
      </div>
    )) }
    </div>
  );
}

export default Crumbs;

