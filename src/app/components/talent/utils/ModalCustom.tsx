import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

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
          <ModalBody>
            { this.props.children }
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
