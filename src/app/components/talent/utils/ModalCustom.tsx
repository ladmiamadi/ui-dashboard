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
  titleModal: string
}

export class ModalCustom extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal isOpen={ this.props.isModalShown } toggle={ this.props.toggleModal } className='modal-action'>
          <ModalHeader toggle={ this.props.toggleModal }>
            <h5 className='header-modal'>{ this.props.titleModal }</h5>
          </ModalHeader>
          <ModalBody  className="modal-language-content">
            { this.props.children }
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
