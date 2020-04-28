import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  TabContent,
} from 'reactstrap';

interface Props {
  isModalShown: boolean,
  toggleModal: () => void,
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
            <h5 className='header-modal'>Ajouter une langues </h5>
          </ModalHeader>
          <ModalBody>
            <div>
              <TabContent>
              </TabContent>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
