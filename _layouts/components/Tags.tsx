import * as React from 'react';
import { Page, Tag, Website } from 'paramorph/models';
import { Link } from 'react-router-dom';

interface Props {
  website : Website;
  page : Page;
}

export const Tags = ({ website, page } : Props) => page.tags.length == 0 ? null : (
  <ul>
  { page.tags.map((title : string) => website.getTagOfTitle(title))
    .map((tag : Tag, key : number) => (
      <li key={ key }><Link to={ tag.url }>{ tag.originalTitle }</Link></li>
    )) }
  </ul>
);

export default Tags;

