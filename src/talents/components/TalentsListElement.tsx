import React from 'react';
import { User, UserProfile } from '../../app';
import { env } from '../../helpers/environment';
import './styles/TalentsList.css';
import './styles/TalentModal.css';

interface Props{
  profile: UserProfile,
  talent: User,
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
        <p className="profile-info">
          {this.props.profile.lastName}
        </p>
      </div>
    );
  }
}
