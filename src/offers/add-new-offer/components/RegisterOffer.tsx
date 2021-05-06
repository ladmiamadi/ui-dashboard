import React, { Component } from 'react';
import '../style/add-new-offer.css';
import NewOfferFormPage from './NewOfferFormPage';

interface Props {

}

class RegisterOffer extends Component<Props> {
    render() {
        return (
            <div className="form-container">
                <div className="title-form">
                    <h1>Formulaire d'ajout d'une nouvelle offre</h1>
                </div>
                <NewOfferFormPage />
            </div>
        );
    }
}

export default RegisterOffer;