import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Page, MenuEntry, Website } from 'paramorph/models';
import Button from '../Button';
import Icon from '../Icon';

const s = require('./Footer.scss');

export interface Props {
  website : Website;
  page : Page;
}

export class Footer extends Component<Props, {}> {
  render() {
    const { website, page } = this.props;
    const index = website.getPageOfUrl('/');
    const sitemap = website.getPageOfUrl('/sitemap');

    return (
      <footer className={ s.footer }>
        <ul>
        { website.menu.map((entry : MenuEntry) => (
          <li key={ entry.url }><Button url={ entry.url }>{ entry.title }</Button></li>
        )) }
        </ul>
        <p className={ s.bottomParagraph }>
          <span className={ s.copyright }>&copy; 2017 Aleksandra Krawczyk</span>
          <span className={ s.indexLink }><Link to={ index.url }>{ index.title }</Link></span>
          <span className={ s.sitemapLink }><Link to={ sitemap.url }>{ sitemap.title }</Link></span>
        </p>
      </footer>
    );
  }
}

export default withStyles(s)(Footer);

