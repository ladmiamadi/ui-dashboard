import React from 'react';
import { RootDispatch } from '../state/store';
import { connect } from 'react-redux';

interface Props {
  fetchModules: () => Promise<void>,
}

export class AppContainer extends React.Component<Props> {
  async componentDidMount() {
    await this.props.fetchModules();
  }

  render() {
    return this.props.children;
  }
}

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchModules: dispatch.modules.fetchModules,
});

export default connect(null, mapDispatch)(AppContainer);
