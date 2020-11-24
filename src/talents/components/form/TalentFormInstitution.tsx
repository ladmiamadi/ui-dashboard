import React from 'react';
import { User, UserProfile } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import ProfileCollection from '../../helpers/ProfileCollection';
import { UpdateUserPayload } from '../../state/models/user-selected';
import classes from './styles/TalentFormInstitution.module.css';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export default class TalentFormInstitution extends React.Component<Props> {
  render() {
    const indexLive: number = ProfileCollection.findLiveIndex(this.props.user.userProfiles);
    const userProfileLive: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles,
      'live',
    );

    return (
      <div className={classes['institution-section']}>
        <div className="form-title">
          <h6>Institution: </h6>
        </div>
        <FieldForm
          keyName="institution"
          label="École: "
          className={classes['institution-field']}
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'institution',
            value,
            index: indexLive,
          })}
          value={userProfileLive?.institution}
          required={true}
        />
        <FieldForm
          keyName="institution-phone"
          label="Téléphone École: "
          className={classes['institution-field']}
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'phoneInstitution',
            value,
            index: indexLive,
          })}
          value={userProfileLive?.phoneInstitution}
          required={true}
        />
        <FieldForm
          keyName="institution-email"
          label="Mail École: "
          className={classes['institution-field']}
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'mailInstitution',
            value,
            index: indexLive,
          })}
          value={userProfileLive?.mailInstitution}
          required={true}
        />
        <FieldForm
          keyName="institution-contact"
          label="Personne de contact: "
          className={classes['institution-field']}
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'personContactInstitution',
            value,
            index: indexLive,
          })}
          value={userProfileLive?.personContactInstitution}
          required={true}
        />
      </div>
    );
  }
}
