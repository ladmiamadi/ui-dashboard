import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { formValidator } from '../../helpers/formValidatorHelper';
import { InputState, UserSignUpPayload, FormValidPayload, LoggedUserStatus } from '../../index.d';
import { RootState, RootDispatch } from '../../../app/state/store';
import { UserSignUp, IsFormValid } from '../..';
import { User, Job } from '../../../app/index.d';
import FormRegisterUser from '../form/FormRegisterUser';
import classes from '../styles/FormRegisterUser.module.css';
import { createDtoUserIntern } from '../../helpers/userFactoryHelper';

interface Props {
  isFormValid: IsFormValid,
  isJobsFetching: boolean,
  isRequesting: boolean,
  jobCollection: Job[],
  usernameCollection: string[],
  userSignUp: UserSignUp,
  fetchJobsInDb: () => Promise<void>,
  fetchUserInDb: () => Promise<void>,
  postUserInDb: (userSentInDb: User) => Promise<void>,
  resetUserSignUp: () => void,
  setIsFormValid: (payload: FormValidPayload) => void,
  updateUserSignUp: (payload: UserSignUpPayload) => void,
}

interface State {
  isModalVisible: boolean,
}

export class ModalRegisterUser extends Component<Props, State> {
  state = {
    isModalVisible: false,
  }

  componentDidMount() {
    this.props.fetchUserInDb();
    this.props.fetchJobsInDb();
  }

  isPostAvailable = (): InputState => {
    return this.props.isRequesting ? InputState.FALSE : formValidator(this.props.isFormValid);
  }

  postUserInDb = () => {
    const userSentInDb = createDtoUserIntern(this.props.userSignUp, this.props.jobCollection);

    this.props.postUserInDb(userSentInDb);
  }

  updateUserSignUp = (property: string, value: string) => {
    const payload: UserSignUpPayload = {
      property,
      value,
    };

    this.props.updateUserSignUp(payload);
  }

  setIsFormValid = (property: string, isInputValid: boolean) => {
    const payload: FormValidPayload = {
      property,
      isInputValid,
    }

    this.props.setIsFormValid(payload);
  }

  toggleModal = () => {
    this.setState((prevState) =>  ({ isModalVisible: !prevState.isModalVisible }));
  }

  render() {
    const isPostAvailable: InputState = this.isPostAvailable();
    const colorButtonAdd = isPostAvailable === InputState.TRUE ? 'success' : 'secondary';
    const contentModalBody = this.props.isRequesting || this.props.isJobsFetching ? 
      (
        <div className={classes.containerSpinner}>
          <Spinner color="success" type="grow" /> 
        </div>
      ) : 
      (
        <FormRegisterUser
          isFormValid={this.props.isFormValid}
          jobCollection={this.props.jobCollection}
          usernameCollection={this.props.usernameCollection}
          userSignUp={this.props.userSignUp} 
          updateUserSignUp={this.updateUserSignUp}
          setIsFormValid={this.setIsFormValid}
        />
      );
    const loggedUser = LoggedUserStatus.ADMIN;
    
    return (
      <>
        {
          (loggedUser === LoggedUserStatus.ADMIN || loggedUser === LoggedUserStatus.HR)  && 
          <Button
            onClick={this.toggleModal}
            color="primary"
            className={classes.AddNewIntern}
          >
            Ajouter un stagiaire
          </Button>
        }
        <Modal isOpen={this.state.isModalVisible} toggle={this.toggleModal}>
          <ModalHeader>Ajout d'un nouveau stagiaire.</ModalHeader>
          <ModalBody>
            { contentModalBody }
          </ModalBody>
          <ModalFooter>
            <Button 
              color={colorButtonAdd} 
              disabled={!isPostAvailable} 
              onClick={this.postUserInDb}>
                Ajouter
            </Button>
            <Button
              color="warning"
              onClick={this.props.resetUserSignUp}>
                Tout effacer
            </Button>
            <Button 
              color="danger" 
              onClick={this.toggleModal}>
                Retour
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapState = (state: RootState) => ({ 
  isFormValid: state.userSignUp.isFormValid,
  isJobsFetching: state.userSignUp.isJobsFetching,
  isRequesting: state.userSignUp.isRequesting,
  jobCollection: state.userSignUp.jobCollection,
  usernameCollection: state.userSignUp.usernameCollection,
  userSignUp: state.userSignUp.userSignUp,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchJobsInDb: dispatch.userSignUp.fetchJobsInDb,
  fetchUserInDb: dispatch.userSignUp.fetchUserInDb,
  postUserInDb: dispatch.userSignUp.postUserInDb,
  resetUserSignUp: dispatch.userSignUp.resetUserSignUp,
  setIsFormValid: dispatch.userSignUp.setIsFormValid,
  updateUserSignUp: dispatch.userSignUp.updateUserSignUp,
});

export default connect(mapState, mapDispatch)(ModalRegisterUser);
