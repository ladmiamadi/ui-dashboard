import React, { Component } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { RootDispatch } from '../../../../app/state/store';
import ContentModalBody from './ContentBody';
import ContentModalFooter from './ContentFooter';

interface Props {
  fetchJobsInDb: () => Promise<void>,
  fetchUserInDb: () => Promise<void>,
  location: Location,
  history: History,
}

export class ModalRegisterUser extends Component<Props> {
  componentDidMount() {
    this.props.fetchUserInDb();
    this.props.fetchJobsInDb();
  }

  toggleModal = () => {
    this.props.history.goBack();
  }

  private isModalRequested(): boolean {
    return this.props.location.hash === '#modal-intern';
  }

  render() {
    return (
      <Modal isOpen={this.isModalRequested()} toggle={this.toggleModal}>
        <ModalHeader>Ajout d'un nouveau stagiaire.</ModalHeader>
        <ModalBody>
          <ContentModalBody />
        </ModalBody>
        <ModalFooter>
          <ContentModalFooter toggleModal={this.toggleModal} />
        </ModalFooter>
      </Modal>
    );
  }
}

const mapState = () => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchJobsInDb: dispatch.userSignUp.fetchJobsInDb,
  fetchUserInDb: dispatch.userSignUp.fetchUserInDb,
});

export default connect(mapState, mapDispatch)(ModalRegisterUser);
