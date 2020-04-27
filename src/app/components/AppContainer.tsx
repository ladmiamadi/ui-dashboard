import React from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from '../state/store';

export class AppContainer extends React.Component {
  render() {
    return this.props.children;
  }
}

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({});

export default connect(mapState, mapDispatch)(AppContainer);
