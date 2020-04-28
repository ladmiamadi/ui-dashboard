import React from 'react';
import { RootDispatch, RootState } from './../../app/state/store';
import { connect } from 'react-redux';
import { Talent } from '..';
import TalentsList from './TalentsList';

interface Props {
  talents: Talent[],
  fetchTalents: () => Promise<void>,
}

export class TalentsListContainer extends React.Component <Props> {
  async componentDidMount() {
    await this.props.fetchTalents();
  }

  render() {
    return <TalentsList />;
  }
}

const mapState = (state: RootState) => ({
  talents: state.talents.list,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchTalents: dispatch.talents.fetchTalents,
});

export default connect(mapState, mapDispatch)(TalentsListContainer);