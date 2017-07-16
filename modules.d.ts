
declare module 'isomorphic-style-loader/lib/withStyles' {
  import { Component } from 'react';

  function withStyles<T, P>(component : Component<T, P>) : (styles : any) => Component<T, P>;

  export default withStyles;
}

declare module 'isomorphic-style-loader/lib/insertCss' {
  function insertCss(styles : any) : () => void;

  export default insertCss;
}

