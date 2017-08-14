import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Page, MenuEntry, Website } from 'paramorph/models';
import Button from '../Button';
import Icon from '../Icon';
import Logo from '../Logo';

import '../polyfill/swipe-events';

const s = require('./TopBar.scss');

export interface Props {
  website : Website;
  page : Page;
  onMenuClick ?: () => void;
}

export class TopBar extends Component<Props, {}> {
  render() {
    const { website, page, onMenuClick } = this.props;

    return (
      <header className={ s.topBar }>
        <div className={ s.hamburger }>
          <Button onClick={ onMenuClick }>
            <Icon name='&#xE5D2;' />
          </Button>
        </div>
        <Link to='/'>
          <span className={ s.title }>Sztuka Uniwersalna</span>
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
}

export default withStyles(s)(TopBar);

