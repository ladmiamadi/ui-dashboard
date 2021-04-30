import React, { Component } from 'react';
import { Job } from '../../../app';
import '../style/add-new-offer.css';
import NewOfferFormPage from './NewOfferFormPage';

interface Props {
    setNewJob(newJob: Job): void,
    job: Job,
    isRequesting: boolean,
    createOffer: (job: Job) => Promise<void>
}

class RegisterOffer extends Component<Props> {
    render() {
        return (
            <div className="form-container">
                <div className="title-form">
                    <h1>Formulaire d'ajout d'une nouvelle offre</h1>
                </div>

                <NewOfferFormPage
                    {...this.props}
                />
            </div>
        );
    }
}

export default RegisterOffer;