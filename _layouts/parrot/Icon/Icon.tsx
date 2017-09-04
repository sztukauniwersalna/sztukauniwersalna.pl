import * as React from 'react';
import { ReactNode } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const s = require('./Icon.scss');

export interface Props {
  name ?: string;
}

export function Icon({ name } : Props) {
  if (name === undefined) {
    return null;
  }

  switch (name) {
    case 'facebook': return renderFacebookIcon();
    case 'instagram': return renderInstagramIcon();
    default: return renderMaterialIcon(name);
  }
}

function renderMaterialIcon(name : string) {
  return (
    <i className='material-icons'>{ name }</i>
  );
}

function renderFacebookIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={ s.icon }
    >
      <g>
        <path
          d='M20.85,0H3.17C1.08,0,0,1.09,0,3.2V20.86A2.82,2.82,0,0,0,3.1,24h8.74V12H9.61V8.85h2.23V7.72a7.74,7.74,0,0,1,.4-2.85,3.2,3.2,0,0,1,1.51-1.53,5.64,5.64,0,0,1,2.76-.59,11.23,11.23,0,0,1,3.35.51L19.31,6a8.2,8.2,0,0,0-1.84-.23,1.59,1.59,0,0,0-1.24.42,2.26,2.26,0,0,0-.38,1.55V8.85h3V12h-3V24h5A2.84,2.84,0,0,0,24,20.82V3.15A2.82,2.82,0,0,0,20.85,0Z'
        />
      </g>
    </svg>
  );
}

function renderInstagramIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={ s.icon }
    >
      <g>
        <path
          d='M20.85,0H3.17C1.08,0,0,1.09,0,3.2V20.86A2.82,2.82,0,0,0,3.1,24H20.85A2.84,2.84,0,0,0,24,20.82V3.15A2.82,2.82,0,0,0,20.85,0Zm-2,2.7c2.37,0,2.37,0,2.37,2.4s0,2.33-2.33,2.33-2.37,0-2.37-2.38S16.57,2.7,18.9,2.7ZM12,7.34a4.65,4.65,0,1,1-.07,9.3,4.72,4.72,0,0,1-4.6-4.71A4.74,4.74,0,0,1,12,7.34Zm9.26,12.5c0,1.12-.32,1.42-1.43,1.42H4.15c-1.1,0-1.42-.3-1.42-1.42,0-2.91,0-5.85,0-8.76,0-.83.23-1,1-1,1.09.1,1.11,0,1,1.1a7.41,7.41,0,0,0,5.81,8,7.47,7.47,0,0,0,8.57-5.15,7.39,7.39,0,0,0,.16-3.44c-.09-.41,0-.5.39-.5,1.66-.12,1.66-.16,1.66,1.55Z'
        />
      </g>
    </svg>
  );
}

export default withStyles(s)(Icon);

