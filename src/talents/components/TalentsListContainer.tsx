import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../app';
import { Loader } from '../../app/components/utils/Loader';
import { RootDispatch, RootState } from '../../app/state/store';
import { TalentsDashBoard } from './TalentsDashBoard';

interface Props {
  isFetching: boolean,
  searchTerm: string,
  users: User[],
  fetchTalents: () => void,
  updateSearchTerm: (searchTerm: string) => void,
}

export class TalentsListContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchTalents();
  }

  render() {
    if (this.props.isFetching) {
      return <Loader />;
    }

    return <TalentsDashBoard
      searchTerm={this.props.searchTerm}
      updateSearchTerm={this.props.updateSearchTerm}
      users={this.props.users}
    />;
  }
}

const mapState = (state: RootState) => ({
  users: state.users.users,
  searchTerm: state.users.searchTerm,
  isFetching: state.users.isFetching,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchTalents: dispatch.users.fetchTalents,
  updateSearchTerm: dispatch.users.updateSearchTerm,
});

export default connect(mapState, mapDispatch)(TalentsListContainer);

