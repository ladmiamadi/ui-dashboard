import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { createDtoUserSignUp } from '../../../helpers/userSignUpFactory';
import { formValidator } from '../../../helpers/formValidator';
import { InputState } from '../index.d';
import { RootState, RootDispatch } from '../../../state/store';
import { UserSignUp, IsFormValid } from '../../../state/models/userSignUp';
import { User } from '../../..';
import FormRegisterUser from '../form/FormRegisterUser';
import classes from '../../styles/FormRegisterUser.module.css';

interface Props {
  isFormValid: IsFormValid,
  isRequesting: boolean,
  listOfAllUsernameOfUsers: string[],
  userSignUp: UserSignUp,
  fetchUserInDb: () => void,
  postUserInDb: (userSentInDb: User) => Promise<void>,
  setIsFormValid: (id: string, payload: boolean) => void,
  updateUserSignUp: (id: string, payload: string) => void,
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
    if(this.props.isRequesting){
      return InputState.FALSE;
    } 

    return formValidator(this.props.isFormValid);
  }

  postUserInDb = async () => {
    const userSentInDb = createDtoUserSignUp(this.props.userSignUp);

    this.props.postUserInDb(userSentInDb);
  }

  setIsFormValid = (id: string, payload: boolean) => {
    this.props.setIsFormValid(id, payload);
  }

  toggleModal = () => {
    this.setState((prevState) =>  ({ isModalVisible: !prevState.isModalVisible }));
  }

  updateUserSignUp = (id: string, payload: string) => {
    this.props.updateUserSignUp(id, payload);
  }

  render() {
    const isPostAvailable: InputState = this.isPostAvailable();
    
    const colorButtonAdd = isPostAvailable === InputState.TRUE ? 'success' : 'secondary';

    const contentModalBody = this.props.isRequesting ? 
      (<div className={classes.containerSpinner}>
        <Spinner color="success" type="grow" /> 
      </div>)
      : 
      (<FormRegisterUser
        isFormValid={this.props.isFormValid}
        listOfAllUsernameOfUsers={this.props.listOfAllUsernameOfUsers}
        userSignUp={this.props.userSignUp} 
        updateUserSignUp={this.updateUserSignUp}
        setIsFormValid={this.setIsFormValid}
      />);

    return (
      <div>
        <Button onClick={this.toggleModal} color="primary">Ajouter un stagiaire</Button>
        <Modal isOpen={this.state.isModalVisible}>
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
              color="danger" 
              onClick={this.toggleModal}>
                Retour
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({ 
  isFormValid: state.userSignUp.isFormValid,
  isRequesting: state.userSignUp.isRequesting,
  listOfAllUsernameOfUsers: state.userSignUp.listOfAllUsernameOfUsers,
  userSignUp: state.userSignUp.userSignUp,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchUserInDb: dispatch.userSignUp.fetchUserInDb,
  postUserInDb: dispatch.userSignUp.postUserInDb,
  setIsFormValid: dispatch.userSignUp.setIsFormValid,
  updateUserSignUp: dispatch.userSignUp.updateUserSignUp,
});

export default connect(mapState, mapDispatch)(ModalRegisterUser);
