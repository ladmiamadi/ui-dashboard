import React from 'react';
import { UserProfile } from '../../app';
import { env } from '../../helpers/environment';
import './styles/TalentsList.css';
import './styles/TalentModal.css';

interface Props {
  profile: UserProfile,
}

export default class TalentsListElement extends React.Component<Props> {
  render() {
    const picture = this.props.profile.picture ?
      `${env('MEDIA_URL')}${this.props.profile.picture?.filePath}` : '';

    return (
      <div className="id-card">
        <img
          className="profile-picture"
          alt={this.props.profile.firstName}
          src={picture}
        />
        <div id="add-margin-top-modal">
          <p>
            {this.props.profile.lastName}
          </p>
          <p>
            {this.props.profile.firstName}
          </p>
        </div>
      </div>
    );
  }
}
