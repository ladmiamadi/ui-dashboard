import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { User } from '../../app';
import { RootState } from '../../app/state/store';
import TalentsListElement from './TalentsListElement';
import './styles/TalentsList.css';

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
    //this.setState({ isModalOpen: false });
  }

  nameToChange(bool: boolean){
    console.log(bool);
    this.setState({ isModalOpen: bool });
  }
  render() {
    return (
      <Container className={this.state.isModalOpen ? 'hide-card' : 'mt-5'}>
        <Row>
          {
            this.props.users.map((talent, index) => (
              <Col key={index} className="element" xs={2}>
                {
                  talent.userProfiles?.filter((profile) => profile.environment === 'live')
                    .map((profile) =>
                      <TalentsListElement
                        key={profile.id}
                        profile={profile}
                        talent={talent}
                        isModalOpen={(bool) => this.nameToChange(bool)}
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
