import { Button } from 'reactstrap';
import React from 'react';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import ModalLanguage from './ModalLanguage';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';

interface State {
  isModalShown: boolean,
  optionsLevelLanguage: string[]
}

interface Props {}

export class TalentFormLanguages extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalShown: false,
      optionsLevelLanguage:  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Langue Maternelle']
    };
  }

  toggleModal =  () => this.setState({ isModalShown: !this.state.isModalShown });

  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Langues: </h6>
          <Button  onClick={ this.toggleModal } className="form-add-button" color='default'>Ajouter une langue</Button>
        </div>
        <SelectFormField
          keyName="language-french"
          label="Français: "
          className="medium"
          options={ this.state.optionsLevelLanguage }
        />
        <SelectFormField
          keyName="language-english"
          label="Anglais: "
          className="medium"
          options={ this.state.optionsLevelLanguage }
        />
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
    );
  }
}

export default TalentFormLanguages;
