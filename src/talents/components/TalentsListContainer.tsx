import React from 'react';
import { RootDispatch, RootState } from '../../app/state/store';
import { Loader } from '../../app/components/utils/Loader';
import { TalentsList } from './TalentsList';
import { User } from '../../app';
import { connect } from 'react-redux';

interface Props {
  talents: User[],
  fetchTalents: () => Promise<void>,
}

export class TalentsListContainer extends React.Component <Props> {
  async componentDidMount() {
    await this.props.fetchTalents();
  }

  render() {
    if (!this.props.talents.length) {
      return <Loader />;
    }
    
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
