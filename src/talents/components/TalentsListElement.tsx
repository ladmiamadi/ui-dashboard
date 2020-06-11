import React from 'react';
import { TalentModal } from './modal/TalentModal';
import { CustomModal } from '../../app/components/modal/CustomModal';
import history from '../../app/components/history';
import  './styles/TalentsList.css';
import { User, UserProfile } from '../../app';
import { env } from '../../helpers/environment';

interface Props {
  profile: UserProfile,
  talent: User
}

interface State {
  isModalShown: boolean,
}

export class TalentsListElement extends React.Component <Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      isModalShown: false,
    };
  }

  toggleModal = () => {
    if(this.props.profile.status === 'ON_VALIDATION') {
      this.setState({
        isModalShown: !this.state.isModalShown,
      });
    } else {
      history.push('/test');
    }
  }

export class TalentsListElement extends React.Component<Props> {
  render() {
    const { profile } = this.props;
    return (
      <>
        <img
          className="profile-picture"
          alt={profile.firstName}
          src={`${env('MEDIA_URL')}/${profile.picture.filePath}`}
        />
        <br />
        { profile.lastName }
        <br />
        { profile.firstName }
{/*          profile.picture
          &&*/}
        <tr className="id-card" onClick={this.toggleModal}>
          <td>
            <img
              className="profile-picture"
              alt={profile.firstName}
              src={`${env('MEDIA_URL')}/${profile.picture.filePath}`}
            />
          </td>
          <td>{profile.lastName}</td>
          <td>{profile.firstName}</td>
        </tr>
        <CustomModal
          isModalShown={this.state.isModalShown}
          toggleModal={this.toggleModal}
          modalTitle={this.props.profile.firstName + ' ' + this.props.profile.lastName}>
          <TalentModal talent={this.props.talent}/>
        </CustomModal>
      </>
    );}
}
