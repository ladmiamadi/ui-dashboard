import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import _ from 'lodash';
import { User } from '../../app';
import { ModalCustom } from '../../app/components/utils/ModalCustom';
import history from '../../app/helpers/history';
import { RootDispatch } from '../../app/state/store';
import { TalentModal } from './modal/TalentModal';
import TalentsListElement from './TalentsListElement';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';
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
    } else
      history.push('/talent');
  }

  userHasMatchingProfile(user: User): boolean {
    const userProfileLive = UserProfileHelpers.findUserProfileLive(user, this.props.searchTerm);
    return userProfileLive ? userProfileLive.length > 0 :  false;
  }

  render() {
    const existUsersWithLiveProfile = this.props.users.filter(user => this.userHasMatchingProfile(user)).length > 0;

    return (
      <Container className={this.state.isModalOpen ? 'hide-card' : 'talent-card'}>
        { existUsersWithLiveProfile ? (
          <Row className="talent-row">
            {
              this.props.users.map((talent, index) => (
                UserProfileHelpers.findUserProfileLive(talent, this.props.searchTerm)?.map((profile) => (

                  <Col key={index} className="element" xs={5} sm={3} xl={2} onClick={() => this.toggleModal(talent)}>
                    <React.Fragment key={profile.id}>
                      <TalentsListElement
                        profile={profile}
                        talent={talent}
                      />
                      <ModalCustom
                        isModalShown={this.state.isModalOpen}
                        toggleModal={() => this.toggleModal(talent)}
                        titleModal={profile.firstName + ' ' + profile.lastName}
                        className="talent-title">
                        <TalentModal talent={talent} />$

                    </ModalCustom>
                    </React.Fragment>
                  </Col>

                ))
              ))
            }
          </Row>
        ) : (
            <Row className="talent-row">No matching user profiles were found</Row>
          )
        }
      </Container >
    );
  }
}

const mapDispatch = (dispatch: RootDispatch) => ({
  updateUserSelected: dispatch.userSelected.updateUserSelected,
});

export default connect(() => { }, mapDispatch)(TalentsList);
