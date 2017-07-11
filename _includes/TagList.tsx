import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Tag, Website } from 'paramorph/models';

export interface Props {
  website : Website,
  page : Page,
}

export function TagList({ website, page } : Props) {
  if (page.tags.length == 0) {
    return null;
  }

  return (
    <ul>
    { page.tags
      .map((title : string) => website.getTagOfTitle(title))
      .map(({ originalTitle, url } : Tag) => (
        <li key={ url }><Link to={ url }>{ originalTitle }</Link></li>
      )) }
    </ul>
  );
}

export default TagList;

