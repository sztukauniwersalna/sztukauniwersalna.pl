import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Page, MenuEntry, Website } from 'paramorph/models';
import Button from '../Button';
import Icon from '../Icon';
import Logo from '../Logo';
import SideMenu, { Item } from 'parrot-layout/SideMenu';

import '../polyfill/swipe-events';

const s = require('./TopBar.scss');

export interface Props {
  website : Website;
  page : Page;
}
interface State {
  sideMenuClassName : string;
}

export class TopBar extends Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      sideMenuClassName: s.closed,
    };

    this.hideMenu = this.hideMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
 }

  componentDidMount() {
    document.body.addEventListener('swipe-left', this.hideMenu);
    document.body.addEventListener('swipe-right', this.showMenu);
  }
  componentWillUnmount() {
    document.body.removeEventListener('swipe-left', this.hideMenu);
    document.body.removeEventListener('swipe-right', this.showMenu);
  }

  render() {
    const { website, page } = this.props;

    return (
      <header className={ s.topBar }>
        <div className={ s.hamburger }>
          <Button onClick={ () => this.showMenu() }>
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
        <div className={ `${s.sideMenu} ${this.state.sideMenuClassName}` }>
          <SideMenu
            visible={ this.state.sideMenuClassName === s.visible }
            onCloseRequested={ () => this.hideMenu() }
            onClosed={ () => this.disableMenu() }
          >
          { website.menu.map(entry => (
            <Item key={ entry.url } url={ entry.url } title={ entry.title } icon={ entry.icon } />
          )) }
          </SideMenu>
        </div>
      </header>
    );
  }

  private showMenu() {
    this.setSideMenuClassName(s.visible);
  }
  private hideMenu() {
    this.setSideMenuClassName('');
  }
  private disableMenu() {
    this.setSideMenuClassName(s.closed);
  }

  private setSideMenuClassName(sideMenuClassName : string) {
    this.setState(prev => ({ ...prev, sideMenuClassName }));
  }
}

export default withStyles(s)(TopBar);

