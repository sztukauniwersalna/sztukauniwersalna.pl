
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

declare module 'react-disqus-comments' {
  import { Component } from 'react';

  export interface Props {
    identifier : string;
    shortname : string;
    title : string;
    url : string;
  }

  export default class DisqusThread extends Component<Props, {}> {
  }
}

