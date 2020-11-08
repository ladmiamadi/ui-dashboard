import React from 'react';
import { UserProfile } from '../../app';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';
import './styles/TalentModal.css';
import './styles/TalentsList.css';

interface Props {
  profile: UserProfile,
}

export default class TalentsListElement extends React.Component<Props> {
  render() {
    const picture = UserProfileHelpers.calculateUserProfilePictureUrl(this.props.profile);

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
