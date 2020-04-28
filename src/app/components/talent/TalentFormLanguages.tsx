import FieldForm from './utils/FieldForm';
import React from 'react';
import { ModalLanguage } from './utils/ModalLanguage';
import { ModalCustom } from './utils/ModalCustom';

interface State {
  isModalShown: boolean,
}

interface Props {}

export class TalentFormHead extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalShown: false
    };
  }

  toggleModal =  () => this.setState({ isModalShown: !this.state.isModalShown });

  render() {
    return(
      <div className="form-section">
        <div className="section-add">
          <h6 >Langues: </h6>
          <button  className="form-add-button" onClick={ this.toggleModal } >Ajouter une langue</button>
          <ModalCustom
            isModalShown={ this.state.isModalShown }
            toggleModal={ this.toggleModal }
          >
            <ModalLanguage/>
          </ModalCustom>

        </div>
        <FieldForm
          type="select"
          keyName="language-french"
          label="Français: "
          selectOptions={ ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Langue Maternelle'] }
        />
        <FieldForm
          type="select"
          keyName="language-english"
          label="Anglais: "
          selectOptions={ ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Langue Maternelle'] }
        />
      </div>
    );
  }
}

export default TalentFormHead;
