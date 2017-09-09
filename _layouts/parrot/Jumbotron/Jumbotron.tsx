import * as React from 'react';
import { ReactNode } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Page, Tag, Website } from 'paramorph/models';

const s = require('./Jumbotron.scss');

type Align = 'center' | 'bottom';

export interface Props {
  src ?: string;
  children ?: ReactNode;
  fullscreen ?: boolean;
  align ?: Align;
}

export function Jumbotron({ children, src, fullscreen = false, align = 'center' } : Props) {
  return (
    <div className={ `${s.container} ${fullscreen ? s.fullscreen : ''} ${s[align]}` }>
      <div className={ `${s.jumbo} contrast compact strong` }>
        <div className={ `${s.text} ${align === 'center' ? 'centered' : ''}` }>
          { children }
        </div>
        { src ? renderImage(src) : null }
      </div>
    </div>
  );
}

const renderImage = (src : string) => (
  <div className={ s.image } style={ { backgroundImage: `url('${src}')` } } />
);

export default withStyles(s)(Jumbotron);

