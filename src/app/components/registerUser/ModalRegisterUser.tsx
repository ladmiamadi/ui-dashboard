import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Spinner } from 'reactstrap';
import FormRegisterUser from './FormRegisterUser';
import { connect } from 'react-redux';
import { RootState, RootDispatch } from '../../state/store';
import { UserSignUp, IsFormValid } from '../../state/models/userSignUp';
import { User } from '../..';
import classes from '../styles/FormRegisterUser.module.css';
import { createDtoUserSignUp } from '../../helpers/userSignUpFactory';

interface Props {
  userSignUp: UserSignUp,
  listUserUsername: string[],
  isFormValid: IsFormValid,
  isRequesting: boolean,
  updateUserSignUp: (userSignUp: UserSignUp) => void,
  fetchUserInDb: () => void,
  setIsFormValid: (isFormValid: IsFormValid) => void,
  postUserInDb: (userSentInDb: User) => Promise<void>,
}
interface State {
  isModalVisible: boolean,
  isAllFormValid: boolean,
}

class ModalRegisterUser extends Component<Props, State> {
  state = {
    isModalVisible: true,
    isAllFormValid: false,
  }

  async componentDidMount() {
    console.log('Je vais fetcher');
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
        <Spinner color="success" type="grow" style={{ margin: 'auto' }}/> 
      </div>)
      : 
      (<FormRegisterUser
        userSignUp={this.props.userSignUp} 
        isFormValid={this.props.isFormValid}
        updateUserSignUp={this.updateUserSignUp}
        setIsFormValid={this.setIsFormValid}
        listUserUsername={this.props.listUserUsername}
      />);

    return (
      <div>
        <Button  onClick={this.toggleModal} color="primary">Ajouter un User</Button>
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
  userSignUp: state.userSignUp.userSignUp,
  listUserUsername: state.userSignUp.listUserUsername,
  isFormValid: state.userSignUp.isFormValid,
  isRequesting: state.userSignUp.isRequesting,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateUserSignUp: dispatch.userSignUp.updateUserSignUp,
  fetchUserInDb: dispatch.userSignUp.fetchUserInDb,
  setIsFormValid: dispatch.userSignUp.setIsFormValid,
  postUserInDb: dispatch.userSignUp.postUserInDb,
});

export default connect(mapState, mapDispatch)(ModalRegisterUser);
