import React from 'react';
import { Job } from '../../app';
import './form/styles/TalentFormInternship.css';
import './styles/TalentModal.css';
import './styles/TalentsList.css';

interface Props {
  jobs: Job,
}

export default class OffersListElement extends React.Component<Props> {
  render() {
    return (
      <div className="id-card">

        <div className="add-margin-top-modal">
          <p>
            {this.props.jobs.titleInFrench}
          </p>
          <p>
            {this.props.jobs.shortDescriptionInFrench}
          </p>
        </div>
      </div>
    );
  }
}
