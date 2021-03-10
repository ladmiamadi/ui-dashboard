import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Job, User, UserProfile } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { UserProfileHelpers } from '../../../app/helpers/UserProfileHelpers';
import { RootDispatch, RootState } from '../../../app/state/store';
import { mapToOptionValues } from '../../helpers/FormHelper';
import ProfileCollection from '../../helpers/ProfileCollection';
import { UpdateUserPayload } from '../../state/models/user-selected';
import { getUserByUsername } from '../../../app/helpers/UserHelpers';
import ModalConfirmationEmail from '../modal/ModalConfirmationEmail';

interface Props {
  jobCollection: Job[],
  user: User,
  users: User[],
  showModal: boolean,
  fetchJobsInDb: () => Promise<void>,
  modifyUser: (payload: UpdateUserPayload) => void,
  setIsEmailSent: (isEmailSent: boolean) => void,
  sendEmail: (userEmail?: string) => void,
}

export class TalentFormHead extends React.Component<Props> {

  componentDidMount() {
    this.props.fetchJobsInDb();
  }
  
  closeModal = () => {
    this.props.setIsEmailSent(false);
  }

  render() {
    const indexLive: number = ProfileCollection.findLiveIndex(this.props.user.userProfiles);
    const userProfileLive: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles, 'live',
    );
    const filePath = UserProfileHelpers.getUserProfilePictureUrl(userProfileLive);
    const jobPositions = this.props.jobCollection.map((job: Job) => job.position);

    const recruiters = this.props.users
      .filter(user => UserProfileHelpers.isHR(user))
      .map(user => UserProfileHelpers.buildOptionValueFromUser(user));

    return (
      <div className="form-head">
        <ModalConfirmationEmail 
          showModal={this.props.showModal} 
          toggleModal={this.closeModal}
        />
        <h1 className="talent-title">Gestion des talents: </h1>
        <img
          className="profile-picture"
          alt={userProfileLive?.firstName}
          src={filePath}
        />
        <div className="head-block">
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
          <SelectFormField
            keyName="position"
            label="Fonction: "
            options={mapToOptionValues(jobPositions)}
            handleChange={(property, value) => this.props.modifyUser({
              category: 'userProfiles',
              property,
              value,
              index: indexLive,
            })}
            value={userProfileLive?.position || ''}
            required={true}
          />
          <FieldForm
            keyName="email"
            label="Email: "
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
            required={false}
          />
          <SelectFormField
            keyName="recruiter"
            label="Sourcé par: "
            options={recruiters}
            handleChange={(property, value) => this.props.modifyUser({
              category: 'userRecruitment',
              property,
              value: getUserByUsername(this.props.users, value),
              index: -1,
            })}
            value={this.props.user.userRecruitment.recruiter?.username || ''}
            required={true}
            noDefaultOption={true}
          />
        </div>
        <div className="connection-box">
          <p>Envoyez un email pour configurer la connexion</p>
          <Button 
            color="default" 
            onClick={() => this.props.sendEmail(userProfileLive?.email)}
          >
            Envoyer
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  jobCollection: state.userSignUp.jobCollection,
  showModal: state.userSignUp.isEmailSent,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchJobsInDb: dispatch.userSignUp.fetchJobsInDb,
  setIsEmailSent: dispatch.userSignUp.setIsEmailSent,
  sendEmail: dispatch.userSignUp.sendTalentConfigEmail,
});

export default connect(mapState, mapDispatch)(TalentFormHead);