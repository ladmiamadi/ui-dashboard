import React from 'react';
import { INTERNSHIP_STATUS, User, UserProfile } from '../../app/index.d';
import { getInternshipRemainingDays, isUserInternshipFinishing } from '../../app/helpers/UserHelpers';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';
import { getInternshipStatusClassname } from '../constants/status-internship';
import './form/styles/TalentFormInternship.css';
import './styles/TalentModal.css';
import './styles/TalentsList.css';

interface Props {
  profile: UserProfile,
  user: User,
}

export default class TalentsListElement extends React.Component<Props> {
  transformRemainingDays(remainingDays: number): string {
    if (remainingDays >= 0 && remainingDays <= 14) {
      return `${remainingDays} j.`;
    }

    return `${Math.floor(remainingDays / 7) + 1} s.`;
  }

  renderOnStatusOngoing(remainingDays: number, statusClassName: INTERNSHIP_STATUS | undefined) {
    return statusClassName === INTERNSHIP_STATUS.ONGOING ? this.transformRemainingDays(remainingDays) : '';
  }

  render() {
    const picture = UserProfileHelpers.getUserProfilePictureUrl(this.props.profile);
    const remainingDays = getInternshipRemainingDays(this.props.user);
    const isInternshipFinishing = isUserInternshipFinishing(remainingDays);
    const statusClassName = getInternshipStatusClassname(
      this.props.user.userJob?.status,
      isInternshipFinishing,
    );

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
          <span title="Jours avant de terminer le stage" className={`badge internship-status ${statusClassName}`}>
            {this.renderOnStatusOngoing(remainingDays, this.props.user.userJob?.status) || <span>&nbsp;</span>}
          </span>
        </div>
      </div>
    );
  }
}
