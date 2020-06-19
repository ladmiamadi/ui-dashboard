import React from 'react';
import { RootDispatch, RootState } from '../../app/state/store';
import { Loader } from '../../app/components/utils/Loader';
import { TalentsDashBoard } from './TalentsDashBoard';
import { User } from '../../app';
import { connect } from 'react-redux';

interface Props {
  users: User[],
  isFetching: boolean,
  fetchTalents: () => void,
}

export class TalentsListContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchTalents();
  }

  render() {
    if (this.props.isFetching) {
      return <Loader />;
    }
    
    return <TalentsDashBoard />;
  }
}

const mapState = (state: RootState) => ({
  users: state.users.users,
  isFetching: state.users.isFetching,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchTalents: dispatch.users.fetchTalents,
});

export default connect(mapState, mapDispatch)(TalentsListContainer);
