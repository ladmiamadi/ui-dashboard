import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { LoggedUserStatus } from '../../../index.d';
import { RootDispatch } from '../../../../app/state/store';
import ContentModalBody from './ContentBody';
import ContentModalFooter from './ContentFooter';
import classes from '../styles/FormRegisterUser.module.css';

interface Props {
  fetchJobsInDb: () => Promise<void>,
  fetchUserInDb: () => Promise<void>,
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

  toggleModal = () => {
    this.setState((prevState) =>  ({ isModalVisible: !prevState.isModalVisible }));
  }

  render() {
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
            <ContentModalBody />
          </ModalBody>
          <ModalFooter>
            <ContentModalFooter toggleModal={this.toggleModal} />
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapState = () => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchJobsInDb: dispatch.userSignUp.fetchJobsInDb,
  fetchUserInDb: dispatch.userSignUp.fetchUserInDb,
});

export default connect(mapState, mapDispatch)(ModalRegisterUser);
