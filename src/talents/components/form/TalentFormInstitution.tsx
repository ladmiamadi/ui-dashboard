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
    const indexWorking: number = ProfileCollection.findWorkingIndex(this.props.user.userProfiles);
    const userProfileWorking: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles,
      'working',
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
            index: indexWorking,
          })}
          value={userProfileWorking?.institution} />
        <FieldForm
          keyName="institution-phone"
          label="Téléphone École: "
          className={classes['institution-field']}
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'phoneInstitution',
            value,
            index: indexWorking,
          })}
          value={userProfileWorking?.phoneInstitution} />
        <FieldForm
          keyName="institution-email"
          label="Mail École: "
          className={classes['institution-field']}
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'mailInstitution',
            value,
            index: indexWorking,
          })}
          value={userProfileWorking?.mailInstitution} />
        <FieldForm
          keyName="institution-contact"
          label="Personne de contact: "
          className={classes['institution-field']}
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'personContactInstitution',
            value,
            index: indexWorking,
          })}
          value={userProfileWorking?.personContactInstitution} />
      </div>
    );
  }
}
