import * as React from 'react';
import { Link } from 'react-router-dom';

import Category from '../src/models/Category';

interface Props {
  categories : Category[];
};

export default ({ categories } : Props) => (
  <div>
  { categories.forEach(({ url, title, pages } : Category) => (
    <h1>
      <Link to={ url }>{ title }</Link>
    </h1>
    <ul>
    { pages.forEach(({ title, url } : Page) => (
      <li><Link to={ url }>{ title }</Link></li>
    )) }
    </ul>
  )) }
  </div>
);

