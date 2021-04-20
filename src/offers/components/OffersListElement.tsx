import React from 'react';
import { Job } from '../../app';
import { OffersHelpers } from '../state/models/helpers/OffersHelpers';
import './styles/offersList.css';

interface Props {
  job: Job,
}

export default class OffersListElement extends React.Component<Props> {
  render() {
    const picture = OffersHelpers.getOfferPictureUrl(this.props.job)
    console.log(this.props.job.shortDescriptionInFrench)

    return (
      <div className="offer-card">
        <img src={picture}
          alt={this.props.job.titleInFrench}
        />
        <h3>
          {this.props.job.titleInFrench}
        </h3>
        <div>
          <p>
            {this.props.job.shortDescriptionInFrench}
          </p>
        </div>
      </div>
    );
  }
}
