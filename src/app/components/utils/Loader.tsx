import React from 'react';
import { Container, Row } from 'reactstrap';
import './styles/Loader.css';

export class Loader extends React.Component {
  render() {
    return (
      <Container>
        <Row className="d-flex justify-content-center pt-4">
          <div className="loader" />
        </Row>
      </Container>
    );
  }
}
