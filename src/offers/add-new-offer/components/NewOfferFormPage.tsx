import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from '../../../app/state/store';
import NewOfferForm from './NewOfferForm';

interface Props {
    getPositionCollection: () => Promise<void>,
}


class NewOfferFormPage extends Component<Props> {
    componentDidMount() {
        this.props.getPositionCollection();
    }

    render() {
        return (
            <div className="form">
                <NewOfferForm />
            </div>
        );
    }
}

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
    getPositionCollection: dispatch.job.fetchJobsFromDb,

});

export default connect(mapState, mapDispatch)(NewOfferFormPage);
