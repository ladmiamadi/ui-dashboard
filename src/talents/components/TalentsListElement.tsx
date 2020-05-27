import './styles/TalentsList.css';
import React from 'react';
import { User } from '../../app';

interface Props {
  talent: User,
}

export class TalentsListElement extends React.Component <Props> {
  render() {
    let path = 'http://hdmnetwork.com/media/';
    return (
      <tr className="id-card">
        { this.props.talent.userProfiles?.filter((profile) => profile.environment === 'live').map((profile) =>
          <>
            <td><img
              className={ 'profilePicture' }
              alt='picture'
              src={ profile.picture ? path + profile.picture.filePath : '' }/></td>
            <td>{ profile.lastName }</td>
            <td>{ profile.firstName }</td>
          </>
        ) }
      </tr>
    );
  }
}
