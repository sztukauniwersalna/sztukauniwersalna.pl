import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

import { Page, Website, MenuEntry } from 'paramorph/models';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Crumbs from '../_includes/Crumbs';
import TagList from '../_includes/TagList';
import TopBar from 'parrot-layout/TopBar';
import Footer from 'parrot-layout/Footer';
import Logo from 'parrot-layout/Logo';
import SideMenu, { Item } from 'parrot-layout/SideMenu';

const s = require('parrot-layout/root.scss');

export interface Props {
  website : Website;
  page : Page;
}
interface State {
  sideMenuClassName : string;
}

export class ParrotLayout extends Component<Props, State> {
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
    window.scrollTo(0, 0);
  }
  componentWillUnmount() {
    document.body.removeEventListener('swipe-left', this.hideMenu);
    document.body.removeEventListener('swipe-right', this.showMenu);
  }

  render() {
    const { website, page } = this.props;

    const Body = page.body;

    return (
      <div id={ s.all }>
        <div className={ s.header }>
          <TopBar website={ website } page={ page } onMenuClick={ this.showMenu } />
        </div>
        <div className={ s.main }>
          <main>
            <h1><Link to={ page.url }>{ page.title }</Link></h1>
            <Crumbs website={ website } page={ page } />
            <TagList website={ website } page={ page } />
            <Body website={ website } page={ page } />
          </main>
        </div>
        <div className={ `${s.footer} contrast` }>
          <Footer website={ website } page={ page } />

          <div className={ s.bottom }>
            <div className={ s.logo }>
              <Logo variant='full' />
            </div>
          </div>
        </div>
        <div className={ `${s.sideMenu} ${this.state.sideMenuClassName}` } onClick={ this.hideMenu } >
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
      </div>
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

export default withStyles(s)(ParrotLayout);

