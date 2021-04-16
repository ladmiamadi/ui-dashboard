import React from 'react';
import { connect } from 'react-redux';
import { Job, User } from '../../app';
import { Loader } from '../../app/components/utils/Loader';
import { RootDispatch, RootState } from '../../app/state/store';
import { OffersDashBoard } from './OffersDashBoard';

interface Props {
  isFetching: boolean,
  searchTerm: string,
  jobs: Job[],
  fetchTalents: () => void,
  updateSearchTerm: (searchTerm: string) => void,
}

export class OffersListContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchTalents();
  }

  render() {
    if (this.props.isFetching) {
      return <Loader />;
    }

    return <OffersDashBoard
      searchTerm={this.props.searchTerm}
      updateSearchTerm={this.props.updateSearchTerm}
      jobs={this.props.jobs}
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

export default connect(mapState, mapDispatch)(OffersListContainer);

