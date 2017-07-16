
declare module 'isomorphic-style-loader/lib/withStyles' {
  import { ReactType } from 'react';

  interface ComponentDecorator {
    <T extends ReactType>(component : T): T;
  }
  interface WithStyles {
    (styles : any) : ComponentDecorator;
  }

  var withStyles : WithStyles;
  export default withStyles;
}

