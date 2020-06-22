import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

interface Props {
  isModalShown: boolean,
  toggleModal: () => void,
  tabs?: any,
  modalTitle: string,
}

export class CustomModal extends React.Component<Props> {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isModalShown} toggle={this.props.toggleModal} className="modal-action">
          <ModalHeader className="header-modal" toggle={this.props.toggleModal}>
            { this.props.modalTitle }
          </ModalHeader>
          <ModalBody>
            { this.props.children }
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
