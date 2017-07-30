import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Page, MenuEntry, Website } from 'paramorph/models';
import Button from '../Button';
import Icon from '../Icon';
import Logo from '../Logo';
import SideMenu from '../SideMenu';

const s = require('./TopBar.scss');

export interface Props {
  website : Website;
  page : Page;
}
interface State {
  sideMenuVisible : boolean;
}

export class TopBar extends Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      sideMenuVisible: false,
    };
  }

  render() {
    const { website, page } = this.props;

    return (
      <header className={ s.topBar }>
        <div className={ s.hamburger }>
          <Button onClick={ () => this.toggleSideMenuVisible() }>
            <Icon name='bars' />
          </Button>
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
        <div className={ `${s.sideMenu} ${this.state.sideMenuVisible ? s.visible : ''}` }>
          <SideMenu visible={ this.state.sideMenuVisible }>
            Side
          </SideMenu>
        </div>
      </header>
    );
  }

  private toggleSideMenuVisible() {
    this.setState(prev => ({ sideMenuVisible : toggle(prev.sideMenuVisible) }));
  }
}

function toggle(value : boolean) {
  switch (value) {
    case true: return false;
    case false: return true;
  }
}

export default withStyles(s)(TopBar);

