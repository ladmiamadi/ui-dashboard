import React from 'react';
import NewOfferButton from '../add-new-offer/components/NewOfferButton';
import OffersListContainer from './OffersListContainer';

export class OffersListPage extends React.Component {
  render() {
    return (
      <div>
        <NewOfferButton />
        <div className="offer-content">
          <h3 className="offer-title">Gestion des offres : sélectionner une offre</h3>
          <OffersListContainer />
        </div>
      </div>
    );
  }
}
