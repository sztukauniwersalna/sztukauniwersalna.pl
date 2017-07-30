import * as React from 'react';
import { ReactNode, Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const s = require('./SideMenu.scss');

export interface Props {
  visible ?: boolean;
  children ?: ReactNode;
}
interface State {
  visible : boolean;
}

export class SideMenu extends Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      visible: props.visible === true,
    };
  }

  componentWillReceiveProps(props : Props) {
    this.setState(oldState => ({ visible : props.visible == true }));
  }

  render() {
    const classNames = [ s.panel ];
    if (this.state.visible) {
      classNames.push(s.visible);
    }

    return (
      <div className={ classNames.join(' ') }>
        { this.props.children }
      </div>
    );
  }
}

export default withStyles(s)(SideMenu);

