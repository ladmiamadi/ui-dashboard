import React from 'react';
import fr from 'date-fns/locale/fr';
import { connect } from 'react-redux';
import { Job, User, UserProfile } from '../../../app';
import { DatePickerFieldForm } from '../../../app/components/utils/DatePickerFieldForm';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { UserProfileHelpers } from '../../../app/helpers/UserProfileHelpers';
import { RootDispatch, RootState } from '../../../app/state/store';
import ProfileCollection from '../../helpers/ProfileCollection';
import { UpdateUserPayload } from '../../state/models/user-selected';

interface Props {
  jobCollection: Job[],
  user: User,
  fetchJobsInDb: () => Promise<void>,
  modifyUser: (payload: UpdateUserPayload) => void,
}

export class TalentFormHead extends React.Component<Props> {

  componentDidMount() {
    this.props.fetchJobsInDb();
  }

  render() {
    const indexLive: number = ProfileCollection.findLiveIndex(this.props.user.userProfiles);
    const userProfileLive: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles, 'live',
    );
    const filePath = UserProfileHelpers.getUserProfilePictureUrl(userProfileLive);
    const jobPositions = this.props.jobCollection.map((job: Job) => job.position);

    return (
      <div className="form-head">
        <h1 className="talent-title">Gestion des talents: </h1>
        <img
          className="profile-picture"
          alt={userProfileLive?.firstName}
          src={filePath}
        />
        <div className="head-block">
          <FieldForm
            keyName="lastname"
            label="Nom: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
              value,
              index: indexLive,
              category: 'userProfiles',
              property: 'lastName',
            })}
            value={userProfileLive?.lastName}
            required={true}
          />
          <FieldForm
            keyName="firstname"
            label="Prénom: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
              value,
              index: indexLive,
              category: 'userProfiles',
              property: 'firstName',
            })}
            value={userProfileLive?.firstName}
            required={true}
          />            
          <SelectFormField
            keyName="position"
            label="Fonction: "
            options={jobPositions}
            handleChange={(property, value) => this.props.modifyUser({
              category: 'userProfiles',
              property,
              value,
              index: indexLive,
            })}
            value={userProfileLive?.position || ''}
          />
          <FieldForm
            keyName="email"
            label="Mail: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
              value,
              index: -1,
              category: 'userProfiles',
              property: 'email',
            })}
            value={userProfileLive?.email}
            required={true}
          />
          <FieldForm
            keyName="phone"
            label="Téléphone: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
              value,
              index: indexLive,
              category: 'userProfiles',
              property: 'phone',
            })}
            value={userProfileLive?.phone}
            required={true}
          />
          <DatePickerFieldForm
            keyName="birthDate"
            label="Date de naissance: "
            value={userProfileLive?.birthDate}
            locale={fr}
            handleChange={(value) => this.props.modifyUser({
              category: 'userProfiles',
              property: 'birthDate',
              value,
              index: indexLive,
            })}
          />
          <FieldForm
            keyName="place"
            label="Nationalité: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
              value,
              index: -1,
              category: 'userProfiles',
              property: 'nationality',
            })}
            value={userProfileLive?.nationality}
            required={true}
          />
          <FieldForm
            keyName="platform"
            label="Plateforme: "
            type="text"
            handleChange={(value) => this.props.modifyUser({
              value,
              index: indexLive,
              category: 'userProfiles',
              property: 'platform',
            })}
            value={userProfileLive?.platform}
            required={true}
          />
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