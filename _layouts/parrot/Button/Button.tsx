import * as React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const s = require('./Button.scss');

export type Variant = 'flat';

export interface Props {
  url: string;
  variant?: Variant;
  children: ReactNode;
}

export function Button({ url, variant = 'flat', children } : Props) {
  return (
    <span className={ `${s.button} ${s[variant]}` }><Link to={ url }>{ children }</Link></span>
  );
}

export default withStyles(s)(Button);

