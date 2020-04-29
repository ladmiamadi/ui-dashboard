import { Button } from 'reactstrap';
import FieldForm from './utils/FieldForm';
import React from 'react';
import { ModalLanguage } from './ModalLanguage';
import { ModalCustom } from './utils/ModalCustom';

interface State {
  isModalShown: boolean,
  optionsLevelLanguage: string[]
}

interface Props {}

export class TalentFormHead extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalShown: false,
      optionsLevelLanguage:  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Langue Maternelle']
    };
  }

  toggleModal =  () => this.setState({ isModalShown: !this.state.isModalShown });

  render() {
    return(
      <div className="form-section">
        <div className="section-add">
          <h6>Langues: </h6>
          <Button  onClick={ this.toggleModal } className="form-add-button">Ajouter une langue</Button>
          <ModalCustom
            isModalShown= { this.state.isModalShown }
            toggleModal= { this.toggleModal }
            titleModal= 'Ajouter une langue'
          >
            <ModalLanguage
              optionsLevelLanguage={ this.state.optionsLevelLanguage }
            />
          </ModalCustom>
        </div>
        <FieldForm
          type="select"
          keyName="language-french"
          label="Français: "
          className="medium"
          selectOptions={ this.state.optionsLevelLanguage }
        />
        <FieldForm
          type="select"
          keyName="language-english"
          label="Anglais: "
          className="medium"
          selectOptions={ this.state.optionsLevelLanguage }
        />
      </div>
    );
  }
}

export default TalentFormHead;
