import React from 'react';
import { User, UserProfile } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ProfileCollection from '../../helpers/ProfileCollection';
import { env } from '../../../helpers/environment';
import { FUNCTION } from '../../constants/function';
interface Props {
  user: User,
  modifyUser: (payload: UpdateUserPayload) => void,
}

export default class TalentFormHead extends React.Component<Props> {
  render() {
    const indexWorking: number = ProfileCollection.findWorkingIndex(this.props.user.userProfiles);
    const userProfileWorking: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles, 'working',
    );
    const filePath: string = userProfileWorking && userProfileWorking.picture ?
      `${env('MEDIA_URL')}${userProfileWorking?.picture?.filePath}` : '';

    return (
      <div className="form-head">
        <h1 className="talent-title">Gestion des talents: Nom Prénom</h1>
        <img
          className="profile-picture"
          alt={userProfileWorking?.firstName}
          src={filePath}
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
            options={FUNCTION}
            handleChange={() => ({})}
            value={userProfileWorking?.position || ''}
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
            label="Nationalité: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
              value: value,
              index: -1,
              category: 'userAddress',
              property: 'country',
            })}
            value={this.props.user.userAddress?.country} />
          <FieldForm
            keyName="platform"
            label="Plateforme: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
              value: value,
              index: indexWorking,
              category: 'userProfiles',
              property: 'platform',
            })}
            value={userProfileWorking?.platform} />
        </div>
        <div className="connection-box">
          <p>Envoyez un email pour configurer la connexion</p>
          <button>Envoyer</button>
        </div>
      </div>
    );
  }
}
