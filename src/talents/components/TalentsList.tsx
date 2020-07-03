import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { User } from '../../app';
import { ModalCustom } from '../../app/components/utils/ModalCustom';
import history from '../../app/helpers/history';
import { RootDispatch, RootState } from '../../app/state/store';
import { TalentModal } from './modal/TalentModal';
import TalentsListElement from './TalentsListElement';
import './styles/TalentsList.css';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';

interface Props {
  users: User[],
  updateUserSelected: (userSelected: User) => void,
}

interface State {
  isModalOpen:boolean,
}

export class TalentsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isModalOpen: false };
  }

  toggleModal = (talent: User) => {
    this.props.updateUserSelected(talent);

    if (UserProfileHelpers.isUserHaveWorkingOnValidationProfile(talent)) {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    } else
      history.push('/talent');
  }

  render() {
    return (
      <Container className={this.state.isModalOpen ? 'hide-card' : 'talent-card'}>
        <Row className="talent-row">
          {
            this.props.users.map((talent, index) => (
              <Col key={index} className="element" xs={5} sm={3} xl={2} onClick={() => this.toggleModal(talent)}>
                {
                  UserProfileHelpers.findUserProfileLive(talent)?.map((profile) =>
                    
                    <>
                      <TalentsListElement
                        key={profile.id + 'talentList'}
                        profile={profile}
                        talent={talent}
                      />
                      <ModalCustom
                        isModalShown={this.state.isModalOpen}
                        toggleModal={() => this.toggleModal(talent)}
                        titleModal={profile.firstName + ' ' + profile.lastName}
                        className="talent-title"
                        key={profile.id + 'modalCustom'}>
                        <TalentModal talent={talent}/>
                      </ModalCustom>
                    </>
                    )
                }
              </Col>
              
            ))
          }
        </Row>
      </Container>
    );
  }
}

const mapState = (state: RootState) => ({
  users: state.users.users,
  userSelected: state.userSelected.userSelected,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateUserSelected: dispatch.userSelected.updateUserSelected,
});

export default connect(mapState, mapDispatch)(TalentsList);
