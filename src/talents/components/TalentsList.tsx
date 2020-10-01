import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { User } from '../../app';
import { RootState } from '../../app/state/store';
import { TalentsListElement } from './TalentsListElement';
import './styles/TalentsList.css';

interface Props {
  users: User[],
}

export class TalentsList extends React.Component<Props> {
  render() {
    return (
      <Container className="mt-5">
        <Row>
          {
            this.props.users.map((talent, index) => (
              <Col key={index} className="element" xs={2}>
                {
                  talent.userProfiles?.filter((profile) => profile.environment === 'live')
                    .map((profile) => <TalentsListElement key={profile.id} profile={profile} />)
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
