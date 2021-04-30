import _ from 'lodash';
import React from 'react';
import { Button } from 'reactstrap';
import { Job } from '../../../app';

interface Props {
    //isFormValid: IsFormValid,
    isRequesting: boolean,
    job: Job,
    setNewJob: (offerSentInDb: Job) => void,
    //resetUserSignUp: () => void,
    //updateUserSelected: (userSelected: User) => void,
}

export class FormFooter extends React.Component<Props> {
    /*isPostAvailable = (): boolean => {
        return this.props.isRequesting ? false : FormValidator.isAllFieldValidated<IsFormValid>(this.props.isFormValid);
    }*/

    /*postOfferInDb = async () => {
        const offerSentInDb = this.props.job;
        /*const offerSentInDb = createDtoUserIntern(
            this.props.userSignUp,
            this.props.jobCollection,
            this.props.userRecruiter,
        );

        return await this.props.postOfferInDb(offerSentInDb);
    }


/*redirectToProfileEdition = (newCreatedUser: Promise<User | null>) => {
    newCreatedUser.then(user => {
        if (user != null) {
            this.props.updateUserSelected(_.cloneDeep(user));
            history.push('/dashboard/talent');
        }
    });

}*/

    render() {
        //const isPostAvailable = this.isPostAvailable();
        //const colorButtonAdd = isPostAvailable ? 'success' : 'secondary';

        return (
            <div className="form-footer">
                <Button
                    color={"success"}
                //disabled={!isPostAvailable}
                //onClick={() => this.redirectToProfileEdition(this.postUserInDb())}
                >
                    Ajouter et Editer
        </Button>
                <Button
                    // color={colorButtonAdd}
                    // disabled={!isPostAvailable}
                    //onClick={() => this.props.setNewJob}
                    onClick={() => this.props.setNewJob(this.props.job)}
                >
                    Ajouter
        </Button>
                <Button
                    color="warning"
                // onClick={this.props.resetUserSignUp}
                >
                    Tout effacer
        </Button>
                <Button
                    color="secondary"
                // onClick={this.props.toggleModal}
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

