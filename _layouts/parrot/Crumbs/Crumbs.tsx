import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Website } from 'paramorph/models';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const s = require('./Crumbs.scss');

interface Props {
  website : Website;
  page : Page;
  responsive ?: boolean;
}

export function Crumbs({ website, page, responsive = false } : Props) {
  return (
    <div className={ `${s.crumbs} ${responsive ? s.responsive : ''}` }>
  { page.getCrumbs(website)
    .map((crumbs : Page[], key : number) => (
      <ul key={ key }>
      { crumbs.map((page : Page) => (
        <li key={ page.url }><Link to={ page.url }>{ page.title }</Link></li>
      )) }
      </ul>
    )) }
    </div>
  );
}

export default withStyles(s)(Crumbs);

