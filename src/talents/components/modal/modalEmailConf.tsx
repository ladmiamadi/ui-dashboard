import React from 'react';
import { Button } from 'reactstrap';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';

interface Props {
  showModal: boolean,
  toggleModal: () => void,
}

export class ModalEmailConf extends React.Component<Props>{
  render() {
    return (
      <ModalCustom
        className=""
        isModalShown={this.props.showModal}
        toggleModal={this.props.toggleModal}
        titleModal="L'email à bien été envoyé">
        <p>L'email de configuration a bien été envoyé au talent.</p>
        <Button color="secondary" onClick={this.props.toggleModal}>
          OK
        </Button>
      </ModalCustom>
    );
  }
}

export default ModalEmailConf;