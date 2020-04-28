import { Container } from 'reactstrap';
import React from 'react';
import { TalentsListContainer } from './TalentsListContainer';

export class TalentsListPage extends React.Component {
  render() {
    return (
      <Container className="talents-list-page">
        <h3 className="talents-list-page-title">Gestion des talents : selectionner un talent</h3>
        <TalentsListContainer />
      </Container>
    );
  }
}
