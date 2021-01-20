import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { User } from '../../app';
import { ModalCustom } from '../../app/components/utils/ModalCustom';
import history from '../../app/helpers/history';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';
import { RootDispatch } from '../../app/state/store';
import { TalentModal } from './modal/TalentModal';
import TalentsListElement from './TalentsListElement';
import './styles/TalentsList.css';

interface Props {
  searchTerm: string,
  users: User[],
  updateUserSelected: (userSelected: User) => void,
}

interface State {
  isModalOpen: boolean,
}

export class TalentsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isModalOpen: false };
  }

  toggleModal = (talent: User) => {
    this.props.updateUserSelected(_.cloneDeep(talent));

    if (UserProfileHelpers.isUserHaveWorkingOnValidationProfile(talent)) {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    } else {
      history.push('/dashboard/talent');
    }
  }

  userHasMatchingProfile(user: User): boolean {
    const userProfileLive = UserProfileHelpers.findUserProfileLive(user, this.props.searchTerm);

    return userProfileLive ? userProfileLive.length > 0 : false;
  }

  render() {
    const filteredUsers = this.props.users
      .filter(user => this.userHasMatchingProfile(user))
      .filter(user => !user.isAdmin);

    return (
      <div className={this.state.isModalOpen ? 'hide-card' : 'talent-card'}>
        { filteredUsers.length > 0 ? (
          <div className="talent-row">
            {
              filteredUsers.map((talent, index) => (
                talent.userProfiles?.map(userProfile => userProfile.environment === 'live' ?
                  (
                    <div key={index} className="element" onClick={() => this.toggleModal(talent)}>
                      <React.Fragment key={talent.id}>
                        <TalentsListElement
                          user={talent}
                          profile={userProfile}
                        />
                        <ModalCustom
                          isModalShown={this.state.isModalOpen}
                          toggleModal={() => this.toggleModal(talent)}
                          titleModal={userProfile.firstName + ' ' + userProfile.lastName}
                          className="talent-title">
                          <TalentModal talent={talent}/>
                        </ModalCustom>
                      </React.Fragment>
                    </div>
                  ) : null
                )
              ))
            }
          </div>
        ) : (
          <h1 className="no-user-found">Aucun profil utilisateur correspondant n'a été trouvé.</h1>
        )
        }
      </div>
    );
  }
}

const mapDispatch = (dispatch: RootDispatch) => ({
  updateUserSelected: dispatch.userSelected.updateUserSelected,
});

export default connect(() => {}, mapDispatch)(TalentsList);
