import * as React from 'react';

interface Props {
  title : string;
  body : string;
};

export default ({ title, body } : Props) => (
  <main>
    <h1>{ title }</h1>
    <div dangerouslySetInnerHTML={ { __html: body } } />
  </main>
);

