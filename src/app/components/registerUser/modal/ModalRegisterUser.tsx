import React, { Component } from 'react';
import FormRegisterUser from '../form/FormRegisterUser';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { createDtoUserSignUp } from '../../../helpers/userSignUpFactory';
import { RootState, RootDispatch } from '../../../state/store';
import { UserSignUp, IsFormValid } from '../../../state/models/userSignUp';
import { User } from '../../..';
import classes from '../../styles/FormRegisterUser.module.css';

interface Props {
  isFormValid: IsFormValid,
  isRequesting: boolean,
  listUserUsername: string[],
  userSignUp: UserSignUp,
  fetchUserInDb: () => void,
  postUserInDb: (userSentInDb: User) => Promise<void>,
  updateUserSignUp: (userSignUp: UserSignUp) => void,
  setIsFormValid: (isFormValid: IsFormValid) => void,
}
interface State {
  isAllFormValid: boolean,
  isModalVisible: boolean,
}

class ModalRegisterUser extends Component<Props, State> {
  state = {
    isAllFormValid: false,
    isModalVisible: false,
  }

  componentDidMount() {
    this.props.fetchUserInDb();
  }

  toggleModal = () => {
    this.setState((prevState) =>  {
      return {
        isModalVisible: !prevState.isModalVisible, 
      };
    });
  }

  updateUserSignUp = (id: string, payload: string) => {
    const oldUserSignUp = {
      ...this.props.userSignUp,
    } as any;

    oldUserSignUp[id] = payload;

    const newUserSignUp = {
      ...oldUserSignUp,
    };

    this.props.updateUserSignUp(newUserSignUp);
  }
  
  setIsFormValid = (id: string, payload: boolean) => {
    const oldIsFormValid = {
      ...this.props.isFormValid,
    } as any;

    oldIsFormValid[id] = payload;

    const newIsFormValid = {
      ...oldIsFormValid,
    };

    this.props.setIsFormValid(newIsFormValid);
  }

  isPostAvailable = () => {
    if(this.props.isRequesting){
      return false;
    } 
    let isAllFormValid = true;

    const isFormValidCheck = {
      ...this.props.isFormValid,
    } as any;

    for(let key in isFormValidCheck){
      isAllFormValid = isAllFormValid && isFormValidCheck[key];
    }

    if(!isAllFormValid || isAllFormValid === undefined){
      isAllFormValid = false;
    }

    return isAllFormValid;
  }

  postUserInDb = async () => {
    const userSentInDb = createDtoUserSignUp(this.props.userSignUp);
    this.props.postUserInDb(userSentInDb);
  }

  render() {
    const isPostAvailable = this.isPostAvailable();
    const colorButtonAdd = isPostAvailable ? 'success' : 'secondary';

    const contentModalBody = this.props.isRequesting ? 
      (<div className={classes.containerSpinner}>
        <Spinner color="success" type="grow" /> 
      </div>)
      : 
      (<FormRegisterUser
        isFormValid={this.props.isFormValid}
        listUserUsername={this.props.listUserUsername}
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
            <Button color={colorButtonAdd} disabled={!isPostAvailable} onClick={this.postUserInDb}>Ajouter</Button>
            <Button color="danger" onClick={this.toggleModal}>Retour</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({ 
  isFormValid: state.userSignUp.isFormValid,
  isRequesting: state.userSignUp.isRequesting,
  listUserUsername: state.userSignUp.listUserUsername,
  userSignUp: state.userSignUp.userSignUp,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchUserInDb: dispatch.userSignUp.fetchUserInDb,
  postUserInDb: dispatch.userSignUp.postUserInDb,
  updateUserSignUp: dispatch.userSignUp.updateUserSignUp,
  setIsFormValid: dispatch.userSignUp.setIsFormValid,
});

export default connect(mapState, mapDispatch)(ModalRegisterUser);
