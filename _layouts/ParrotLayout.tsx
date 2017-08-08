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

const s = require('parrot-layout/root.scss');

export interface Props {
  website : Website;
  page : Page;
}

export class ParrotLayout extends Component<Props, {}> {
  render() {
    const { website, page } = this.props;

    const Body = page.body;

    return (
      <div id={ s.all }>
        <div className={ s.header }>
          <TopBar website={ website } page={ page } />
        </div>
        <main>
          <h1><Link to={ page.url }>{ page.title }</Link></h1>
          <Crumbs website={ website } page={ page } />
          <TagList website={ website } page={ page } />
          <Body website={ website } page={ page } />
        </main>
        <div className={ `${s.footer} contrast` }>
          <Footer website={ website } page={ page } />

          <div className={ s.bottom }>
            <div className={ s.logo }>
              <Logo variant='full' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ParrotLayout);

