import React from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from '../../app/state/store';
import { TalentModal } from './modal/TalentModal';
import { CustomModal } from '../../app/components/modal/CustomModal';
import { User, UserProfile } from '../../app';
import { env } from '../../helpers/environment';
import { Redirect } from 'react-router-dom';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';
import  './styles/TalentsList.css';

interface Props {
  profile: UserProfile,
  talent: User,
  toggleModal: () => void,
  updateUser: (user: User) => void,
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
    this.props.updateUser(this.props.talent);

    if (UserProfileHelpers.isUserHaveWorkingOnValidationProfile(this.props.talent)) {
      this.setState({
        isModalShown: !this.state.isModalShown,
      });
      this.props.toggleModal();
    } else
    // we need to redirect to the talentForm when we will merge with the form
      this.setState({ redirect: '/' });
  }

  render() {
    if (this.state.redirect !== ''){
      return <Redirect to={{ pathname: this.state.redirect }} />;
    }

    return (
      <div className="id-card" onClick={this.toggleModal}>
        <img
          className="profile-picture"
          alt={this.props.profile.firstName}
          src={`${env('MEDIA_URL')}/${this.props.profile.picture.filePath}`}
        /> 
        <br />
        {this.props.profile.firstName}
        <br />
        {this.props.profile.firstName}
        <CustomModal
          isModalShown={this.state.isModalShown}
          toggleModal={this.toggleModal}
          modalTitle={this.props.profile.firstName + ' ' + this.props.profile.lastName}>
          <TalentModal talent={this.props.talent}/>
        </CustomModal>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.users.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateUser: dispatch.users.updateUser,
});

export default connect(mapState, mapDispatch)(TalentsListElement);
