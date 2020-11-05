import React from 'react';
import './styles/TalentModal.css';
import './styles/TalentsList.css';
import { env } from '../../helpers/environment';
import { UserProfile } from '../../app';

interface Props {
  profile: UserProfile,
}

export default class TalentsListElement extends React.Component<Props> {
  render() {
    const picture = env('MEDIA_URL') + (this.props.profile.picture ?
      `${this.props.profile.picture?.filePath}` : '/default_avatar.png');

    return (
      <div className="id-card">
        <img
          className="profile-picture"
          alt={this.props.profile.firstName}
          src={picture}
        />
        <div className="add-margin-top-modal">
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
