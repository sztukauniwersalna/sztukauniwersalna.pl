import * as React from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Page, MenuEntry, Website } from 'paramorph/models';
import Button from '../Button';
import Icon from '../Icon';
import Logo from '../Logo';

const s = require('./TopBar.scss');

export interface Props {
  website : Website;
  page : Page;
}

export function TopBar({ website, page } : Props) {
  return (
    <header className={ s.topBar }>
      <div className={ s.hamburger }>
        <Button onClick={ () => {} }><Icon name='bars' /></Button>
      </div>
      <Link to='/'>
        <div className={ s.smallLogo }><Logo variant='small' /></div>
        <div className={ s.inlineLogo }><Logo variant='inline' /></div>
      </Link>
      <nav className={ s.topMenu }>
        <ul>
        { website.menu.map(entry => (
          <li key={ entry.url }><Button url={ entry.url }>{ entry.short }</Button></li>
        )) }
        </ul>
      </nav>
    </header>
  );
}

export default withStyles(s)(TopBar);

