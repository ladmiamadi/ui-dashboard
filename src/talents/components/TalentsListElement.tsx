import React from 'react';
import { User } from '..';
import './styles/TalentsList.css';

interface Props {
  talent: User,
}

export class TalentsListElement extends React.Component <Props> {
  render() {
    return (
      <tr className="id-card">
        <td><img alt='picture' src={ this.props.talent.userProfiles[0].picture_path } /></td>
        { this.props.talent.userProfiles.filter((profile)=> profile.environment === 'live').map((profile) =>
          <>
            <td>{ profile.lastName }</td>
            <td>{ profile.firstName }</td>
          </>
        ) }
        <td>{ this.props.talent.userProfiles[0].environment === 'live' ?
          this.props.talent.userProfiles[0].firstName : this.props.talent.userProfiles[1].firstName }</td>
        {/*<td>{ this.props.talent.lastname }</td>*/}
      </tr>
    );
  }
}
