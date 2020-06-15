import React from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from '../../app/state/store';
import { TalentModal } from './modal/TalentModal';
import { CustomModal } from '../../app/components/modal/CustomModal';
import history from '../../app/components/history';
import { useHistory } from 'react-router-dom';
import  './styles/TalentsList.css';
import { User, UserProfile } from '../../app';
import { env } from '../../helpers/environment';
import { TalentsListContainer } from './TalentsListContainer';
import { Test } from './Test';
import { Redirect } from 'react-router-dom';

interface Props {
  profile: UserProfile,
  talent: User,
  isModalOpen: (bool: boolean) => void,
  //filterUser: (id: number) => void,
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
    //const history = useHistory();
    //await this.props.fetchTalent(this.props.talent.id);
/*    console.log(this.props.talent.id);
    if (this.props.talent.id != null) {
      this.props.filterUser(this.props.talent.id);
    }*/
    let userProfileWorking = this.props.talent.userProfiles?.filter((profile) =>
      profile.environment === 'working' && profile.status === 'ON_VALIDATION');
    if ( userProfileWorking?.length ) {
      this.setState({
        isModalShown: !this.state.isModalShown,
      });
      this.props.isModalOpen(this.state.isModalShown);
    } else {
      //not good, reload the page
      //window.location.href = '/test';
      //history.push('/test');
      this.setState({ redirect: '/test' });
      /*      if (this.state.redirect !== ''){
        console.log(this.state.redirect);
        return <Redirect to={this.state.redirect}/>;
      }*/
    }
  }

  render() {
    const { profile } = this.props;

    if (this.state.redirect !== ''){
      console.log(this.state.redirect);
   /*   this.context.router.push({
        pathname: '/test',
        state: { user: this.props.talent },
      });*/
      return <Redirect
        to={{
          pathname:'/test',
          state: this.props.talent.id,
        }} />;
    }

    return (
      <div className="id-card" onClick={this.toggleModal}>
        <img
          className="profile-picture"
          alt={profile.firstName}
          src={`${env('MEDIA_URL')}/${profile.picture.filePath}`}
        /> 
        <br />
        {profile.lastName}
        <br />
        {profile.firstName}
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

/*const mapDispatch = (dispatch: RootDispatch) => ({
  filterUser: dispatch.users.filterUser,
});*/

export default connect(mapState)(TalentsListElement);
