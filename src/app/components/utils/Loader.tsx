import React from 'react';
import { Container, Row } from 'reactstrap';

export class Loader extends React.Component {
  render() {
    return (
      <Container>
        <Row className="d-flex justify-content-center pt-4">
          <div className="loader">
            <div />
          </div>
        </Row>
      </Container>
    );
  }
}
