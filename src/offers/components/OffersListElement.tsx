import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../app';
import { OffersHelpers } from '../state/models/helpers/OffersHelpers';
import './styles/offers-list.css';

interface Props {
  job: Job,
  ToggleOpenJob: (selectedOffer: Job) => void,
}

export default class OffersListElement extends React.Component<Props> {
  render() {
    const picture = OffersHelpers.getOfferPictureUrl(this.props.job);

    return (
      <div className="offer-card">
        <div className="onoffswitch">
          <label className="switch">
            <input type="checkbox" checked={this.props.job.isOpen}
              onChange={(e) => this.props.ToggleOpenJob({ ...this.props.job, isOpen: e.target.checked })} />
            <span className="slider round"></span>
          </label>
        </div>

        <div>
          <Link to={`dashboard/our-offers/edit/${this.props.job.id}`}>
            <img src={picture}
              alt={this.props.job.titleInFrench}
            />
          </Link>
        </div>

        <Link to={`dashboard/our-offers/edit/${this.props.job.id}`}>
          <h3>{this.props.job.titleInFrench}</h3>
        </Link>

        <div>
          <p>{this.props.job.shortDescriptionInFrench}</p>
        </div>
      </div>
    );
  }
}
