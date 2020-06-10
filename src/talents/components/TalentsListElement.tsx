import React from 'react';
import { Talent } from '..';
import { TalentModal } from './modal/TalentModal';
import { CustomModal } from '../../app/components/modal/CustomModal';
import history from '../../app/components/history';
import  './styles/TalentsList.css';
import { UserProfile } from '../../app';
import { env } from '../../helpers/environment';

interface Props {
  talent: Talent,
}

interface State {
  isModalShown: boolean,
}

export class TalentsListElement extends React.Component <Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      isModalShown: false
    };
  }

  toggleModal = () => {
    if(this.props.talent.status === "Demande de modification en cours") {
      this.setState({
        isModalShown: !this.state.isModalShown
      });
    } else {
      history.push('/test');
    }
  }

  render() {
    return (
      <>
        {
          profile.picture
          && (
            <img
              className="profile-picture"
              alt={profile.firstName}
              src={`${env('MEDIA_URL')}/${profile.picture.filePath}`}
            />
          )
        }
        <br />
        { profile.lastName }<br />
        { profile.firstName }
      </>
      <>
        <tr className="id-card" onClick={ this.toggleModal }>
          <td><img src={ this.props.talent.picture_path }/></td>
          <td>{ this.props.talent.firstname }</td>
          <td>{ this.props.talent.lastname }</td>
        </tr>
        <CustomModal
          isModalShown={ this.state.isModalShown }
          toggleModal={ this.toggleModal }
          modalTitle={ this.props.talent.firstname + ' ' + this.props.talent.lastname }>
          <TalentModal talent={ this.props.talent }/>
        </CustomModal>
      </>
    );
  }
}
