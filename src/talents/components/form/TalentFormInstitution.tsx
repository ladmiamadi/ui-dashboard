import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UpdateUserPayload } from '../../state/models/user';
import ProfileCollection from '../../helpers/ProfileCollection';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export class TalentFormInstitution extends React.Component<Props> {
  render() {
    const indexWorking: number = ProfileCollection.findWorkingIndex(this.props.user.userProfiles);
    const userProfileWorking: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles, 
      'working',
    );

    return (
      <div className="form-section">
        <FieldForm
          keyName="institution"
          label="École: "
          className="large"
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'institution',
            value: value,
            index: indexWorking,
          })}
          value={userProfileWorking?.institution} />
        <FieldForm
          keyName="institution-phone"
          label="Téléphone École: "
          className="medium"
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'phoneInstitution',
            value: value,
            index: indexWorking,
          })}
          value={userProfileWorking?.phoneInstitution} />
        <FieldForm
          keyName="institution-email"
          label="Mail École: "
          className="medium"
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'mailInstitution',
            value: value,
            index: indexWorking,
          })}          
          value={userProfileWorking?.mailInstitution} />
        <FieldForm
          keyName="institution-contact"
          label="Personne de contact: "
          className="large"
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'personContactInstitution',
            value: value,
            index: indexWorking,
          })}          
          value={userProfileWorking?.personContactInstitution} />
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormInstitution);
