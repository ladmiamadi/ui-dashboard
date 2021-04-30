import React, { Component } from 'react';
import { Job } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CustumTextArea } from './CustumTextArea';

interface Props {
    setNewJob(newJob: Job): void,
    job: Job,
    createOffer(job: Job): void,
}

class FormBody extends Component<Props> {
    /* handleChange(e: React.FormEvent<HTMLInputElement>, keyName: String) {
         let value = e.currentTarget.value;
         this.props.postOfferInDb({ ...this.props.job, keyName: value });
     }*/

    render() {
        return (
            <React.Fragment>
                <div className="title-offer">
                    <FieldForm
                        keyName="title_in_french"
                        label="Titre Français *"
                        type='text'
                        className="input-form"
                        value={""}
                        handleChange={(value) => {
                            this.props.setNewJob({ ...this.props.job, titleInFrench: value })
                        }}
                    />
                    <FieldForm
                        keyName="title_in_english"
                        label="Titre Anglais *"
                        type='text'
                        className="input-form"
                        value={""}
                        handleChange={(value) => {
                            this.props.setNewJob({ ...this.props.job, titleInEnglish: value })
                        }}
                    />
                </div>
                <div className="short-description-offer">
                    <FieldForm
                        keyName="short_description_in_french"
                        label="Description Courte Français (Page Nos Offres) * "
                        type='text'
                        className="input-form"
                        value={""}
                        handleChange={(value) => {
                            this.props.setNewJob({ ...this.props.job, shortDescriptionInFrench: value })
                        }}
                    />
                    <FieldForm
                        keyName="short_description_in_english"
                        label="Description Courte Anglais (Page Nos Offres) * "
                        type='text'
                        className="input-form"
                        value={""}
                        handleChange={(value) => {
                            this.props.setNewJob({ ...this.props.job, shortDescriptionInEnglish: value })
                        }}
                    />
                </div>
                <CustumTextArea
                    keyName="long_description_in_french"
                    label="Description Longue Français (Page Nos Offres) * "
                    value={""}
                    setNewJob={this.props.setNewJob}
                    job={this.props.job}

                />
                <CustumTextArea
                    keyName="long_description_in_english"
                    label="Description Longue Anglais (Page Nos Offres) * "
                    value={""}
                    setNewJob={this.props.setNewJob}
                    job={this.props.job}
                />
                <div className="title-offer">
                    <FieldForm
                        keyName="link_french"
                        label="Lien Français (Pour le référencement) *"
                        type='text'
                        className="input-form"
                        value={""}
                        handleChange={(value) => {
                            this.props.setNewJob({ ...this.props.job, linkFrench: value })
                        }}
                    />
                    <FieldForm
                        keyName="link_english"
                        label="Lien Anglais * "
                        type='text'
                        className="input-form"
                        value={""}
                        handleChange={(value) => {
                            this.props.setNewJob({ ...this.props.job, linkEnglish: value })
                        }}
                    />
                </div>
                <div className="picture-position">
                    <FieldForm
                        keyName="picture"
                        label="Ajouter une photo * "
                        type='file'
                        //value={this.props.selectedOffer.picture.filePath}
                        className="input-form"
                        handleChange={(value) => {
                            const picPath = {
                                'filePath': value
                            }
                            //this.props.modifyOffer({ ...this.props.selectedOffer, picture: picPath });
                        }}
                    />
                    <FieldForm
                        keyName="position"
                        label="Position *"
                        type='text'
                        className="input-form"
                        value={""}
                        handleChange={(value) => {
                            this.props.setNewJob({ ...this.props.job, position: value })
                        }}
                    />
                </div>

            </React.Fragment >
        );
    }
}

export default FormBody;