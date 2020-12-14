import React from 'react';
import TalentsListContainer from './TalentsListContainer';

export class TalentsListPage extends React.Component {
  render() {
    return (
      <div id="talents-list">
        <h3>Gestion des talents : sélectionner un talent</h3>
        <TalentsListContainer />
      </div>
    );
  }
}
