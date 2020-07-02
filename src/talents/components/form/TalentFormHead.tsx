import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ProfileCollection from '../../helpers/ProfileCollection';
import { env } from '../../../helpers/environment';

interface Props {
  user: User,
  modifyUser: (payload: UpdateUserPayload) => void,
}

export class TalentFormHead extends React.Component<Props> {
  render() {
    const indexWorking: number = ProfileCollection.findWorkingIndex(this.props.user.userProfiles);
    const userProfileWorking: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles, 'working',
    );

    return (
      <div className="form-head">
        <h1 className="talent-title">Gestion des talents: Nom Prénom</h1>
        <img
          className="profile-picture"
          alt={userProfileWorking?.firstName}
          src={`${env('MEDIA_URL')}/${userProfileWorking?.picture?.filePath}`}
        />
        <div className="head-block">
          <FieldForm
            keyName="lastname"
            label="Nom: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
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
            handleChange={(value) => this.props.modifyUser({
              value: value,
              index: indexWorking,
              category: 'userProfiles',
              property: 'firstName',
            })}
            value={userProfileWorking?.firstName} />
          <SelectFormField
            keyName="function"
            label="Fonction: "
            options={['aaa', 'bbb']}
            handleOnChange={() => ({})}
            value="Aucun"
          />
          <FieldForm
            keyName="email"
            label="Mail: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
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
            handleChange={(value) => this.props.modifyUser({
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
            handleChange={(value) => this.props.modifyUser({
              value: value,
              index: -1,
              category: 'userAddress',
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
  user: state.userSelected.userSelected,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.userSelected.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormHead);
