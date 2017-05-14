import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title : string;
  body : string;
  topLinks : any;
};

export default ({ title, body, topLinks } : Props) => (
  <div>
    <nav>
      <ul>
      { Object.keys(topLinks)
          .map((name, key) => <Link to={ topLinks[name] } key={ key }>{ name }</Link>) }
      </ul>
    </nav>
    <header>
      <h1>{ title }</h1>
      <div dangerouslySetInnerHTML={ { __html: body } } />
    </header>
  </div>
);

