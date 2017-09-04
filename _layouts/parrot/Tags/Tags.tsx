import * as React from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Page, Tag, Website } from 'paramorph/models';
import Button from '../Button';

const s = require('./Tags.scss');

export interface Props {
  website : Website,
  page : Page,
}

export function Tags({ website, page } : Props) {
  if (page.tags.length == 0) {
    return null;
  }

  return (
    <ul className={ s.tags }>
    { page.tags
      .map((title : string) => website.getTagOfTitle(title))
      .map(({ title, url } : Tag) => (
        <li key={ url }><Button url={ url }>{ title }</Button></li>
      )) }
    </ul>
  );
}

export default withStyles(s)(Tags);

