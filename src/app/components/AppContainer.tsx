import React from 'react';

interface Props {
  children: React.ReactNode,
}

export default class AppContainer extends React.Component<Props> {

  render() {
    return this.props.children;
  }
}
