import React from 'react';
import { connect } from 'react-redux';
import { Job } from '../../app';
import { RootDispatch, RootState } from '../../app/state/store';
import NewOfferButton from '../add-new-offer/components/NewOfferButton';
import OffersListContainer from './OffersListContainer';

interface Props {
  updateList(jobs: Job[]): void,
  jobs: Job[],
}

class OffersListPage extends React.Component<Props> {
  componentDidMount() {
    this.props.updateList(this.props.jobs);
  }

  render() {
    return (
      <div>
        <NewOfferButton />
        <div className="offer-content">
          <h3 className="offer-title">Gestion des offres : sélectionner une offre</h3>
          <OffersListContainer />
        </div>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  jobs: state.jobs.jobs,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateList: dispatch.jobs.updateList,
});

export default connect(mapState, mapDispatch)(OffersListPage);
