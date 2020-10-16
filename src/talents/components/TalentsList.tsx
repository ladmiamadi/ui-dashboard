import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import _ from 'lodash';
import { User } from '../../app';
import { ModalCustom } from '../../app/components/utils/ModalCustom';
import history from '../../app/helpers/history';
import { RootDispatch, RootState } from '../../app/state/store';
import { TalentModal } from './modal/TalentModal';
import TalentsListElement from './TalentsListElement';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';
import './styles/TalentsList.css';

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
    this.props.updateUserSelected(_.cloneDeep(talent));

    if (UserProfileHelpers.isUserHaveWorkingOnValidationProfile(talent)) {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    } else
      history.push('/talent');
  }
  // filteredIntern = (talent: User) => {
  //   this.props.updateUserSelected;

  //   if (contentSearchBar == ){

  //   }
  // }
  // filteredModal(event) {
  //   this.setState({searchTerm
  //   })

  // }

  render() {
    // let filteredInterns = this.props.updateUserSelected;
    return (
      <Container className={this.state.isModalOpen ? 'hide-card' : 'talent-card'}>
        <Row className="talent-row">
          {
            this.props.users.map((talent, index) => (
              <Col key={index} className="element" xs={5} sm={3} xl={2} onClick={() => this.toggleModal(talent)}>
                {
                  UserProfileHelpers.findUserProfileLive(talent)?.map((profile) => (
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
                          {/* console.log(this.state.isModalOpen); */}
                        <TalentModal talent={talent}/>$
                        
                      </ModalCustom>
                    </React.Fragment>
                  )
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
