import React from 'react';
import { UserProfile } from '../../app';
import { env } from '../../helpers/environment';

interface Props {
  profile: UserProfile,
}

export class TalentsListElement extends React.Component<Props> {
  render() {
    const { profile } = this.props;
    return (
      <>
        <img
          className="profile-picture"
          alt={profile.firstName}
          src={`${env('MEDIA_URL')}/${profile.picture.filePath}`}
        />
        <br />
        { profile.lastName }
        <br />
        { profile.firstName }
      </>
    );
  }
}
