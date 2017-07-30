import * as React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const s = require('./Button.scss');

export type Variant = 'flat';

export interface Props {
  url ?: string;
  onClick ?: (event : React.MouseEvent<any>) => void;
  variant ?: Variant;
  children : ReactNode;
}

export function Button({ url, variant = 'flat', onClick, children } : Props) {
  if (url !== undefined) {
    return (
      <span className={ `${s.button} ${s[variant]}` }>
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
    <span className={ `${s.button} ${s[variant]}` }>
      <button onClick={ onClick }>
        { children }
      </button>
    </span>
  );
}

export default withStyles(s)(Button);

