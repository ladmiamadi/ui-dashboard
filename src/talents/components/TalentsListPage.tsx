import React from 'react';
import { Container } from 'reactstrap';
import TalentsListContainer from './TalentsListContainer';

export class TalentsListPage extends React.Component {
  render() {
    return (
      <Container id="talents-list">
        <h3>Gestion des talents : sélectionner un talent</h3>
        <TalentsListContainer />
      </Container>
    );
  }
}
