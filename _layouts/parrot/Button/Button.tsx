import * as React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const s = require('./Button.scss');

export type Variant = 'flat' | 'raised' | 'action';
export type Color = 'green' | 'purple' | 'gray';
export type ClickListener = (event : React.MouseEvent<any>) => void;

export interface Props {
  url ?: string;
  onClick ?: ClickListener;
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
    if (url.match(/^[a-z0-9]+?:\/\/.*$/) !== null) {
      return renderExternalLink(classNames, url, onClick, children);
    }
    return renderLink(classNames, url, onClick, children);
  }
  if (onClick === undefined) {
    throw new Error('url or onClick prop must be set on Button element');
  }
  return renderButton(classNames, onClick, children);
}

function renderExternalLink(
  classNames : string[],
  url : string,
  onClick ?: ClickListener,
  children ?: ReactNode
) {
  return (
    <span className={ classNames.join(' ') }>
      <a href={ url } onClick={ onClick }>
        { children }
      </a>
    </span>
  );
}

function renderLink(
  classNames : string[],
  url : string,
  onClick ?: ClickListener,
  children ?: ReactNode
) {
  return (
    <span className={ classNames.join(' ') }>
      <Link to={ url } onClick={ onClick }>
        { children }
      </Link>
    </span>
  );
}

function renderButton(
  classNames : string[],
  onClick ?: ClickListener,
  children ?: ReactNode
) {
  return (
    <span className={ classNames.join(' ') }>
      <button onClick={ onClick }>
        { children }
      </button>
    </span>
  );
}

export default withStyles(s)(Button);

