import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Job } from '../../../app';
import { RootDispatch, RootState } from '../../../app/state/store';
import FormBody from './FormBody';

interface Props {
    setNewJob(newJob: Job): void,
    createOffer(job: Job): void,
    job: Job,
    isRequesting: boolean,
}

class NewOfferFormPage extends Component<Props> {

    render() {
        return (
            <div className="form">
                <FormBody
                    {...this.props}
                />
                <Button
                    // color={colorButtonAdd}
                    // disabled={!isPostAvailable}
                    //onClick={() => this.props.setNewJob}
                    onClick={() => this.props.createOffer(this.props.job)}
                >
                    Ajouter
        </Button>
            </div>
        );
    }
}

const mapState = (state: RootState) => ({
    //isFormValid: state.userSignUp.isFormValid,
    isRequesting: state.userSignUp.isRequesting,
    //jobCollection: state.userSignUp.jobCollection,
    job: state.job.newJob,

    //userRecruiter: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
    createOffer: dispatch.job.postNewOfferInDb,
    setNewJob: dispatch.job.setNewJob
    //resetUserSignUp: dispatch.userSignUp.resetUserSignUp,
    // updateUserSelected: dispatch.userSelected.updateUserSelected,
});

export default connect(mapState, mapDispatch)(NewOfferFormPage);
