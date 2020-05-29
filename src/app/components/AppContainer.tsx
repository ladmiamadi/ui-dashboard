import React from 'react';
import { connect } from 'react-redux';

interface Props {
  children: JSX.Element
}

export class AppContainer extends React.Component<Props> {
  render() {
    return this.props.children;
  }
}

export default connect(() => ({}), () =>({}))(AppContainer);
