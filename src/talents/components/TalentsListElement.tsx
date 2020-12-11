import React from 'react';
import { User, UserProfile } from '../../app';
import { isUserInternshipFinishing } from '../../app/helpers/user';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';
import classes from '../components/form/styles/TalentFormInternship.module.css';
import { getInternshipStatusClassname } from '../constants/status-internship';
import './styles/TalentModal.css';
import './styles/TalentsList.css';

interface Props {
  profile: UserProfile,
  user: User,
}

export default class TalentsListElement extends React.Component<Props> {
  render() {
    const picture = UserProfileHelpers.getUserProfilePictureUrl(this.props.profile);

    const { nDiffDays, isInternshipFinishing } = isUserInternshipFinishing(this.props.user);

    const statusClassName = getInternshipStatusClassname(this.props.user.userJob?.status, isInternshipFinishing);

    const className = 'badge ' + classes['internship-status'] + ' ' + classes[statusClassName];

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
          <span title="jours pour terminer le stage" className={className}>
            {(isInternshipFinishing && nDiffDays) || <span>&nbsp;</span>}
          </span>
        </div>
      </div>
    );
  }
}
