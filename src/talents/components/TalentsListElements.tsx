import './styles/TalentsList.css';
import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { User } from '../../app';
import { RootState } from '../../app/state/store';
import { TalentsListElement } from './TalentsListElement';

interface Props {
  talents: User[],
}

export class TalentsListElements extends React.Component <Props> {
  render() {
    return (
      <Container className="mt-5">
        <Row>
          {
            this.props.talents.map((talent) => (
              <Col className="element" xs={2}>
                {
                  talent.userProfiles?.filter((profile) => profile.environment === 'live')
                    .map((profile) => <TalentsListElement profile={profile} />)
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
  talents: state.talents.list,
});

export default connect(mapState)(TalentsListElements);
