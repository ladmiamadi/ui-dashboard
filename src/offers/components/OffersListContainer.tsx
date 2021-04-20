import React from 'react';
import { connect } from 'react-redux';
import { Job } from '../../app';
import { Loader } from '../../app/components/utils/Loader';
import { RootDispatch, RootState } from '../../app/state/store';
import { OffersDashBoard } from './OffersDashBoard';

interface Props {
  isFetching: boolean,
  searchTerm: string,
  jobs: Job[],
  fetchOffers: () => void,
  updateSearchTerm: (searchTerm: string) => void,
}

export class OffersListContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchOffers();
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
  jobs: state.jobs.jobs,
  searchTerm: state.jobs.searchTerm,
  isFetching: state.jobs.isFetching,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchOffers: dispatch.jobs.fetchOffers,
  updateSearchTerm: dispatch.jobs.updateSearchTerm,
});

export default connect(mapState, mapDispatch)(OffersListContainer);

