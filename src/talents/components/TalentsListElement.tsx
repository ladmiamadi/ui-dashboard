import React from 'react';
import { connect } from 'react-redux';
import { ModalCustom } from '../../app/components/utils/ModalCustom';
import { RootDispatch, RootState } from '../../app/state/store';
import { TalentModal } from './modal/TalentModal';
import { User, UserProfile } from '../../app';
import { env } from '../../helpers/environment';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';
import './styles/TalentsList.css';
import './styles/TalentModal.css';
import history from '../../app/helpers/history';

interface Props{
  profile: UserProfile,
  talent: User,
  toggleModal: () => void,
  updateUserSelected: (userSelected: User) => void,
}

interface State {
  isModalShown: boolean,
  redirect: string,
}

export class TalentsListElement extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalShown: false,
      redirect: '',
    };
  }

  toggleModal = () => {
    this.props.updateUserSelected(this.props.talent);
    //let history = useHistory();
    if (UserProfileHelpers.isUserHaveWorkingOnValidationProfile(this.props.talent)) {
      this.setState({
        isModalShown: !this.state.isModalShown,
      });

      this.props.toggleModal();
    } else
      history.push('/talent');
  }

  render() {
    return (
      <div className="id-card" onClick={this.toggleModal}>
        <img
          className="profile-picture"
          alt={this.props.profile.firstName}
          src={`${env('MEDIA_URL')}/${this.props.profile.picture.filePath}`}
        />
        <p className="profile-info">
          {this.props.profile.firstName}
        </p>
        <p className="profile-info">
          {this.props.profile.firstName}
        </p>
        <ModalCustom
          isModalShown={this.state.isModalShown}
          toggleModal={this.toggleModal}
          titleModal={this.props.profile.firstName + ' ' + this.props.profile.lastName}
          className="talent-title">
          <TalentModal talent={this.props.talent}/>
        </ModalCustom>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  userSelected: state.userSelected.userSelected,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateUserSelected: dispatch.userSelected.updateUserSelected,
});

export default connect(mapState, mapDispatch)(TalentsListElement);
