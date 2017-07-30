import * as React from 'react';
import { ReactNode } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const s = require('./Icon.scss');

export type Name = 'bars';

export interface Props {
  name: Name;
}

export function Icon({ name } : Props) {
  return (
    <i className={ `fa fa-${name}` }></i>
  );
}

export default withStyles(s)(Icon);

