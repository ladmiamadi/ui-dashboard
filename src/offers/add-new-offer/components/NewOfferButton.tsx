import React, { Component } from 'react';
import history from '../../../app/helpers/history';

class NewOfferButton extends Component {
    render() {
        return (
            <div className="add-offer">
                <button onClick={() => (history.push('/dashboard/our-offers/edit'))}>Ajouter Une offre</button>
            </div>
        );
    }
}

export default NewOfferButton;