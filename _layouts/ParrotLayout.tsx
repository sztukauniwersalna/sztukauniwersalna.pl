import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Page, Category, Tag, Website, MenuEntry } from 'paramorph/models';

import TopBar from 'parrot-layout/TopBar';
import Crumbs from 'parrot-layout/Crumbs';
import Tags from 'parrot-layout/Tags';
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
          <div className={ `${s.jumbotron} contrast` }>
            <div>{ jumbotronFor(website, page) }</div>
          </div>
          <main>
            <h1><Link to={ page.url }>{ page.title }</Link></h1>
            <Tags website={ website } page={ page } />
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

function jumbotronFor(website : Website, page : Page) {
  if (page instanceof Category || page.url === '/') {
    return null;
  }
  if (page instanceof Tag) {
    return null;
  }

  return (
    <Crumbs website={ website } page={ page } />
  );
}

export default withStyles(s)(ParrotLayout);

