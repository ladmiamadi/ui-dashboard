import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import './styles/modal-custom.css';

interface Props {
  isModalShown: boolean,
  titleModal: string
  toggleModal: () => void,
}

export class ModalCustom extends React.Component<Props> {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isModalShown} toggle={this.props.toggleModal} className="modal-action">
          <ModalHeader toggle={this.props.toggleModal} tag="div">
            <h6 className="header-modal">{ this.props.titleModal }</h6>
          </ModalHeader>
          <ModalBody className="modal-body-content">
            { this.props.children }
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
