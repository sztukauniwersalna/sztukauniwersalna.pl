import * as React from 'react';
import { Component, ReactNode, ReactElement, Children, cloneElement } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Button from '../Button';
import Icon from '../Icon';

const s = require('./SideMenu.scss');

export interface ItemProps {
  icon ?: string;
  title : string;
  url : string;
}

export function Item(props : ItemProps) {
  return null;
}

export interface Props {
  visible ?: boolean;
  onCloseRequested : () => void;
  onClosed : () => void;
  children ?: ReactElement<ItemProps>[];
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
    }

    const { onCloseRequested, children } = this.props;

    return (
      <aside
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
        <ul className={ s.content }>
          { renderItems(children) }
        </ul>
      </aside>
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

function renderItems(children ?: ReactElement<ItemProps>[]) {
  if (!children) {
    return null;
  }

  return ([] as ReactElement<ItemProps>[]).concat(children)
    .map(item => (
      <li key={ item.props.url }>
        <Link to={ item.props.url }>
          <span className={ s.itemIcon }><Icon name={ item.props.icon } /></span>
          <span className={ s.itemTitle }>{ item.props.title }</span>
        </Link>
      </li>
    ));
}

export default withStyles(s)(SideMenu);

