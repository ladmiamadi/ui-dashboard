import React from 'react';
import { Button } from 'reactstrap';
import { Job } from '../../../app';
import history from '../../../app/helpers/history';

interface Props {
    resetForm: () => void,
    setAddEdit: () => void,
}

interface State {
    addEdit: boolean,
}

export class FormFooter extends React.Component<Props, State> {


    /*isPostAvailable = (): boolean => {
        return this.props.isRequesting ? false : FormValidator.isAllFieldValidated<IsFormValid>(this.props.isFormValid);
    }*/


    render() {
        //const isPostAvailable = this.isPostAvailable();
        //const colorButtonAdd = isPostAvailable ? 'success' : 'secondary';

        return (
            <div className="form-footer">
                <Button
                    color={"success"}

                    //disabled={!isPostAvailable}
                    onClick={this.props.setAddEdit}
                    type='submit'
                >
                    Ajouter et Editer
        </Button>
                <Button
                    // color={colorButtonAdd}
                    // disabled={!isPostAvailable}
                    //onClick={() => this.props.setNewJob}
                    type='submit'
                >
                    Ajouter
        </Button>
                <Button
                    color="warning"
                    onClick={this.props.resetForm}
                >
                    Tout effacer
        </Button>
                <Button
                    color="secondary"
                    onClick={() => history.push('/dashboard/our-offers')}
                >
                    Retour
        </Button>
            </div>

        );
    }
}

/*const mapState = (state: RootState) => ({
    //isFormValid: state.userSignUp.isFormValid,
    isRequesting: state.userSignUp.isRequesting,
    //jobCollection: state.userSignUp.jobCollection,
    newJob: state.job.newJob
    //userRecruiter: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
    postOfferInDb: dispatch.job.postNewOfferInDb,
    //resetUserSignUp: dispatch.userSignUp.resetUserSignUp,
    // updateUserSelected: dispatch.userSelected.updateUserSelected,
});

export default connect(mapState, mapDispatch)(FormFooter);*/

export default FormFooter;

