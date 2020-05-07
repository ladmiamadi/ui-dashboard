import React from 'react';
import { Talent } from '..';
import { CustomModal } from '../../app/components/modal/CustomModal';
import  './styles/TalentsList.css';
import { TalentModal } from './modal/TalentModal';
import history from '../../app/components/history';

interface Props {
  talent: Talent,
}

interface State {
  isModalShown: boolean,
}

export class TalentsListElement extends React.Component <Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      isModalShown: false
    };
  }
  
  toggleModal = () => {
    if(this.props.talent.validationRequest) {
      this.setState({
        isModalShown: !this.state.isModalShown
      });
    } else {
      history.push('/test');
    }
  }
  render() {
    return (
      <>
        <tr className="id-card" onClick={ this.toggleModal }>
          <td>{ this.props.talent.id }</td>
          <td>{ this.props.talent.firstname }</td>
          <td>{ this.props.talent.lastname }</td>
        </tr>
        <CustomModal
          isModalShown={ this.state.isModalShown }
          toggleModal={ this.toggleModal }
          modalTitle={ this.props.talent.firstname + ' ' + this.props.talent.lastname }>
          <TalentModal talent={ this.props.talent }/>
        </CustomModal>
      </>
    );
  }
}