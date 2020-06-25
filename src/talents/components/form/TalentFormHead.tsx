import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UpdateUserPayload } from '../../state/models/user';
import ProfileCollection from '../../helpers/ProfileCollection';

interface Props {
  user: User,
  modifyUser: (payload: UpdateUserPayload) => void,
}

interface Payload {
  index: number,
  category: string,
  property: string,
  value: string,
}

export class TalentFormHead extends React.Component<Props> {
  handleChange(payload: Payload) {
    this.props.modifyUser(payload);
  }

  render() {
    const indexWorking: number = ProfileCollection.findWorkingIndex(this.props.user.userProfiles);
    const userProfileWorking: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles, 'working',
    );

    return (
      <div className="form-head">
        <h1 className="talent-title">Gestion des talents: Nom Prénom</h1>
        <img src="https://place-hold.it/300x300" alt="pic"/>
        <div className="head-block">
          <FieldForm
            keyName="lastname"
            label="Nom: "
            type="text"
            handleChange={(value) => this.handleChange({
              value: value,
              index: indexWorking,
              category: 'userProfiles',
              property: 'lastName',
            })}
            value={userProfileWorking?.lastName} />
          <FieldForm
            keyName="firstname"
            label="Prénom: "
            type="text"
            handleChange={(value) => this.handleChange({
              value: value,
              index: indexWorking,
              category: 'userProfiles',
              property: 'firstname',
            })}            
            value={userProfileWorking?.firstName} />
          <SelectFormField
            keyName="function"
            label="Fonction: "
            options={['aaa', 'bbb']} />
          <FieldForm
            keyName="email"
            label="Mail: "
            type="text"
            handleChange={(value) => this.handleChange({
              value: value,
              index: -1,
              category: 'username',
              property: '',
            })}            
            value={this.props.user.username} />
          <FieldForm
            keyName="phone"
            label="Téléphone: "
            type="text"
            handleChange={(value) => this.handleChange({
              value: value,
              index: indexWorking,
              category: 'userProfiles',
              property: 'phone',
            })}            
            value={userProfileWorking?.phone} />
          <FieldForm
            keyName="place"
            label="Localisation: "
            type="text"
            handleChange={(value) => this.handleChange({
              value: value,
              index: indexWorking,
              category: 'userProfiles',
              property: 'country',
            })}            
            value={this.props.user.userAddress?.country} />
        </div>
        <div className="connexion-box">
          <p>Envoyez un email pour configurer la connexion</p>
          <button>Envoyer</button>
        </div>
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

export default connect(mapState, mapDispatch)(TalentFormHead);
