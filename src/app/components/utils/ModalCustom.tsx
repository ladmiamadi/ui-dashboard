import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import '../styles/modal-custom.css';

interface Props {
  isModalShown: boolean,
  toggleModal: () => void,
  titleModal: string,
  className?: string,
}

export class ModalCustom extends React.Component<Props> {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isModalShown} toggle={this.props.toggleModal} className="modal-action">
          <ModalHeader className={this.props.className} toggle={this.props.toggleModal}>
            { this.props.titleModal }
          </ModalHeader>
          <ModalBody className="modal-content">
            { this.props.children }
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
