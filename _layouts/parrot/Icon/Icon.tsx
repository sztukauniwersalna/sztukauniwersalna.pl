import * as React from 'react';
import { ReactNode } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const s = require('./Icon.scss');

export interface Props {
  name ?: string;
}

export function Icon({ name } : Props) {
  return (
    <i className='material-icons'>{ name }</i>
  );
}

export default withStyles(s)(Icon);

