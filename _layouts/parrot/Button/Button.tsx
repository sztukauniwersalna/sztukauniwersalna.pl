import * as React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const s = require('./Button.scss');

export type Variant = 'flat' | 'raised' | 'action';

export type Color = 'green' | 'purple' | 'gray';

export interface Props {
  url ?: string;
  onClick ?: (event : React.MouseEvent<any>) => void;
  variant ?: Variant;
  color ?: Color;
  children : ReactNode;
}

export function Button({ url, variant = 'flat', color = 'gray', onClick, children } : Props) {
  const classNames = [ s.button, s[variant] ];
  if (variant !== 'flat') {
    classNames.push(s[color]);
  }

  if (url !== undefined) {
    return (
      <span className={ classNames.join(' ') }>
        <Link to={ url } onClick={ onClick }>
          { children }
        </Link>
      </span>
    );
  }
  if (onClick === undefined) {
    throw new Error('url or onClick prop must be set on Button element');
  }

  return (
    <span className={ classNames.join(' ') }>
      <button onClick={ onClick }>
        { children }
      </button>
    </span>
  );
}

export default withStyles(s)(Button);

