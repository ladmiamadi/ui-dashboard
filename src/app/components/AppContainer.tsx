import React from 'react';
import { connect } from 'react-redux';
import { RootDispatch } from '../state/store';
//import { RootState } from '../state/store';

interface Props {
  children: React.ReactNode,
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

/*const mapState = (mapState: RootState) => ({});*/

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchModules: dispatch.modules.fetchModules,
});

//export default connect(mapState, mapDispatch)(AppContainer);
export default connect(mapDispatch)(AppContainer);
