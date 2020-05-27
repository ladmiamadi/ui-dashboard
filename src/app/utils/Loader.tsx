import './styles/Loader.css';
import { Container, Row } from 'reactstrap';
import React from 'react';

export class Loader extends React.Component {
  render() {
    return (
      <Container>
        <Row className='d-flex justify-content-center pt-4'>
          <div className="loader">
          </div>
        </Row>
      </Container>
    );
  }
}
