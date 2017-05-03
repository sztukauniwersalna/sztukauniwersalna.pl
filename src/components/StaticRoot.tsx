import * as React from 'react';
import { StaticRouter } from 'react-router-dom';

interface Props {
  title : string;
  path : string;
  children : Element[];
}

export default ({ title, path, children } : Props) => (
  <html>
    <head>
      <title>{ title }</title>
      <meta name="path" content={ path }/>
    </head>
    <body>
      <div id="root">
        <StaticRouter location={ path } context={{}}>
          { ...children }
        </StaticRouter>
      </div>
    </body>
  </html>
);

