import * as React from 'react';
import { ReactNode, Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Button from '../Button';
import Icon from '../Icon';

const s = require('./SideMenu.scss');

export interface Props {
  visible ?: boolean;
  children ?: ReactNode;
  onCloseRequested ?: () => void;
  onClosed ?: () => void;
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
    this.setState(prevState => ({ ...prevState, visible : props.visible == true }));
  }

  render() {
    const classNames = [ s.panel ];
    if (this.state.visible) {
      classNames.push(s.visible);
      self.document.body.classList.add('side-menu');
    } else {
      self.document.body.classList.remove('side-menu');
    }

    const { onCloseRequested = () => {} } = this.props;

    return (
      <div
        className={ classNames.join(' ') } onTransitionEnd={ () => this.onTransitionEnd() }
        onClick={ e => e.stopPropagation() }
      >
        <div className={ s.header }>
          <div className={ s.closeButton }>
            <Button onClick={ onCloseRequested }>
              <Icon name='close' />
            </Button>
          </div>
        </div>
        <div className={ s.content }>
          { this.props.children }
        </div>
      </div>
    );
  }

  private onTransitionEnd() {
    if (this.props.visible) {
      return;
    }
    const { onClosed = () => {} } = this.props;
    onClosed();
  }
}

export default withStyles(s)(SideMenu);

