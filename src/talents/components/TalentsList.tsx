import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { User } from '../../app';
import { RootState } from '../../app/state/store';
import TalentsListElement from './TalentsListElement';
import './styles/TalentsList.css';
import { UserProfileHelpers } from '../../app/helpers/UserProfileHelpers';

interface Props {
  users: User[],
}

interface State {
  isModalOpen:boolean,
}

export class TalentsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isModalOpen: false };
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <Container className={this.state.isModalOpen ? 'hide-card' : 'mt-5'}>
        <Row>
          {
            this.props.users.map((talent, index) => (
              <Col key={index} className="element" xs={2}>
                {
                  UserProfileHelpers.findUserProfileLive(talent)?.map((profile) =>
                    <TalentsListElement
                      key={profile.id}
                      profile={profile}
                      talent={talent}
                      toggleModal={this.toggleModal}
                    />)
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
});

export default connect(mapState)(TalentsList);
