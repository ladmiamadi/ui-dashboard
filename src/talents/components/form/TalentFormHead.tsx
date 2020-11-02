import fr from 'date-fns/locale/fr';
import React from 'react';
import { connect } from 'react-redux';
import { Job, User, UserProfile } from '../../../app';
import { DatePickerFieldForm } from '../../../app/components/utils/DatePickerFieldForm';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { RootDispatch, RootState } from '../../../app/state/store';
import { env } from '../../../helpers/environment';
import ProfileCollection from '../../helpers/ProfileCollection';
import { UpdateUserPayload } from '../../state/models/userSelected';

interface Props {
  user: User,
  jobCollection: Job[],
  modifyUser: (payload: UpdateUserPayload) => void,
  fetchJobsInDb: () => Promise<void>,
}

export class TalentFormHead extends React.Component<Props> {

  componentDidMount() {
    this.props.fetchJobsInDb();
  }

  render() {
    const indexWorking: number = ProfileCollection.findWorkingIndex(this.props.user.userProfiles);
    const userProfileWorking: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles, 'working',
    );
    const filePath: string = userProfileWorking && userProfileWorking.picture ?
      `${env('MEDIA_URL')}${userProfileWorking?.picture?.filePath}` : '';

    const jobPositions = this.props.jobCollection.map((job: Job) => job.position);

    return (
      <div className="form-head">
        <h1 className="talent-title">Gestion des talents: </h1>
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
            keyName="position"
            label="Fonction: "
            options={jobPositions}
            handleChange={(property, value) => this.props.modifyUser({
              category: 'userProfiles',
              property,
              value,
              index: indexWorking,
            })}
            value={userProfileWorking?.position || ''}
          />
          <FieldForm
            keyName="email"
            label="Mail: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
              value: value,
              index: -1,
              category: 'userProfiles',
              property: '',
            })}
            value={userProfileWorking?.email} />
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
          <DatePickerFieldForm
            keyName="birthDate"
            label="Date de naissance: "
            value={userProfileWorking?.birthDate}
            locale={fr}
            handleChange={(value) => this.props.modifyUser({
              category: 'userProfiles',
              property: 'birthDate',
              value,
              index: indexWorking,
            })}
          />
          <FieldForm
            keyName="place"
            label="Nationalité: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
              value: value,
              index: -1,
              category: 'userProfiles',
              property: 'nationality',
            })}
            value={userProfileWorking?.nationality} />
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

const mapState = (state: RootState) => ({
  jobCollection: state.userSignUp.jobCollection,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchJobsInDb: dispatch.userSignUp.fetchJobsInDb,
});

export default connect(mapState, mapDispatch)(TalentFormHead);