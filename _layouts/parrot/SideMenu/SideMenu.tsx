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
  onCloseRequested : () => void;
  onClosed : () => void;
}
interface State {
  visible : boolean;
}

export class SideMenu extends Component<Props, State> {
  private element : HTMLDivElement;

  constructor(props : Props) {
    super(props);

    const { visible = false } = props;

    this.state = {
      visible,
    };
  }

  componentWillReceiveProps(props : Props) {
    this.setState(prevState => {
      const { visible = false } = props;
      return { ...prevState, visible };
    });
  }

  render() {
    const classNames = [ s.panel ];

    if (this.state.visible) {
      classNames.push(s.visible);

      self.document.body.classList.add('side-menu');
    } else {
      self.document.body.classList.remove('side-menu');
    }

    const { onCloseRequested, children } = this.props;

    return (
      <div
        className={ classNames.join(' ') }
        onTransitionEnd={ () => this.onTransitionEnd() }
        tabIndex={ -1 }
        onBlur={ () => this.onBlur() }
        ref={ elem => this.element = elem as HTMLDivElement }
      >
        <div className={ s.header }>
          <div className={ s.closeButton }>
            <Button onClick={ onCloseRequested }>
              <Icon name='close' />
            </Button>
          </div>
        </div>
        <div className={ s.content }>
          { children }
        </div>
      </div>
    );
  }

  private onBlur() {
    if (this.state.visible) {
      this.props.onCloseRequested();
    }
  }

  private onTransitionEnd() {
    if (this.props.visible) {
      this.element.focus();
      return;
    }
    this.element.blur();

    this.props.onClosed();
  }
}

export default withStyles(s)(SideMenu);

