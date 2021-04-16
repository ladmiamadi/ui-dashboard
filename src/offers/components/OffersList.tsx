import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Job } from '../../app';

import { RootDispatch } from '../../app/state/store';
import './styles/TalentsList.css';
import OffersListElement from './OffersListElement';

interface Props {
  searchTerm: string,
  jobs: Job[],
  updateUserSelected: (offerSelected: Job) => void,
}

interface State {
  isModalOpen: boolean,
}

export class OffersList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isModalOpen: false };
  }

  render() {
    const filteredOffers = this.props.jobs
    /*.filter(user => this.userHasMatchingProfile(user))
    .filter(user => !user.isAdmin);*/

    return (
      filteredOffers.map((offer, index) => {
        <div className="talent-row" >
          <React.Fragment key={offer.id}>
            <OffersListElement
              jobs={offer}
            />
          </React.Fragment>
        </div >
      })

    )
  }
}

