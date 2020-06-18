import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { createDtoUserSignUp } from '../../helpers/userSignUpFactoryHelper';
import { formValidator } from '../../helpers/formValidatorHelper';
import { InputState } from '../../index.d';
import { RootState, RootDispatch } from '../../../app/state/store';
import { UserSignUp, IsFormValid } from '../../state/models/userSignUp';
import { User } from '../../../app/index.d';
import FormRegisterUser from '../form/FormRegisterUser';
import classes from '../../styles/FormRegisterUser.module.css';

interface Props {
  isFormValid: IsFormValid,
  isRequesting: boolean,
  usernameCollection: string[],
  userSignUp: UserSignUp,
  fetchUserInDb: () => Promise<void>,
  postUserInDb: (userSentInDb: User) => Promise<void>,
  resetUserSignUp: () => void,
  setIsFormValid: (id: string, isInputValid: boolean) => void,
  updateUserSignUp: (id: string, idValue: string) => void,
}

interface State {
  isModalVisible: boolean,
}

class ModalRegisterUser extends Component<Props, State> {
  state = {
    isModalVisible: false,
  }

  componentDidMount() {
    this.props.fetchUserInDb();
  }

  isPostAvailable = (): InputState => {
    if (this.props.isRequesting) {
      return InputState.FALSE;
    } 

    return formValidator(this.props.isFormValid);
  }

  postUserInDb = () => {
    const userSentInDb = createDtoUserSignUp(this.props.userSignUp);

    this.props.postUserInDb(userSentInDb);
  }

  toggleModal = () => {
    this.setState((prevState) =>  ({ isModalVisible: !prevState.isModalVisible }));
  }

  render() {
    const isPostAvailable: InputState = this.isPostAvailable();
    const colorButtonAdd = isPostAvailable === InputState.TRUE ? 'success' : 'secondary';
    const contentModalBody = this.props.isRequesting ? 

      (<div className={classes.containerSpinner}>
        <Spinner color="success" type="grow" /> 
      </div>) : 
      (<FormRegisterUser
        isFormValid={this.props.isFormValid}
        usernameCollection={this.props.usernameCollection}
        userSignUp={this.props.userSignUp} 
        updateUserSignUp={this.props.updateUserSignUp}
        setIsFormValid={this.props.setIsFormValid}
      />);

    return (
      <>
        <Button onClick={this.toggleModal} color="primary">Ajouter un stagiaire</Button>
        <Modal isOpen={this.state.isModalVisible} toggle={this.toggleModal}>
          <ModalHeader>Ajout d'un stagiaire.</ModalHeader>
          <ModalBody>
            {contentModalBody}
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
  isRequesting: state.userSignUp.isRequesting,
  usernameCollection: state.userSignUp.usernameCollection,
  userSignUp: state.userSignUp.userSignUp,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchUserInDb: dispatch.userSignUp.fetchUserInDb,
  postUserInDb: dispatch.userSignUp.postUserInDb,
  resetUserSignUp: dispatch.userSignUp.resetUserSignUp,
  setIsFormValid: dispatch.userSignUp.setIsFormValid,
  updateUserSignUp: dispatch.userSignUp.updateUserSignUp,
});

export default connect(mapState, mapDispatch)(ModalRegisterUser);
