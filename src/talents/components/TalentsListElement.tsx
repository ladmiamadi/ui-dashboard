import React from 'react';
import { User, UserProfile } from '../../app';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';
import { getInternshipStatusClassname } from '../constants/status-internship';
import './styles/TalentModal.css';
import './styles/TalentsList.css';
import classes from '../components/form/styles/TalentFormInternship.module.css';
import { isUserInternshipFinishing } from '../../app/helpers/user';

interface Props {
  profile: UserProfile,
  user: User,
}

export default class TalentsListElement extends React.Component<Props> {
  render() {
    const picture = UserProfileHelpers.getUserProfilePictureUrl(this.props.profile);
    const { nDiffDays, isInternshipFinishing } = isUserInternshipFinishing(this.props.user);
    const currentClassName = getInternshipStatusClassname(this.props.user.userJob?.status, isInternshipFinishing);

    return (
      <div className={classes[currentClassName]}>
        <div className="id-card">
          <img
            className="profile-picture"
            alt={this.props.profile.firstName}
            src={picture}
          />
          <div className="add-margin-top-modal">
            <p>
              {this.props.profile.lastName} {isInternshipFinishing && nDiffDays}
            </p>
            <p>
              {this.props.profile.firstName}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
