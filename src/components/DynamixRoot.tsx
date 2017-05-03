import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children : Element[];
}

export default ({ children } : Props) => (
  <BrowserRouter>
    { ...children }
  </BrowserRouter>
);

