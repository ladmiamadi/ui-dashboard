import React from 'react';
import OffersListContainer from './OffersListContainer';

export class OffersListPage extends React.Component {
  render() {
    return (
      <div className="offer-content">
        <h3 className="offer-title">Gestion des offres : sélectionner une offre</h3>
        <OffersListContainer />
      </div>
    );
  }
}
