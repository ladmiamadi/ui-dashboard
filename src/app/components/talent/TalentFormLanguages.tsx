import FieldForm from './utils/FieldForm';
import React from 'react';

export class TalentFormHead extends React.Component {
  render() {
    return(
      <div className="form-section">
        <h6>Langues: </h6>
        <button className="form-add-button">Ajouter une langue</button>
        <FieldForm
          type="select"
          keyName="language-french"
          label="Français: "
          selectOptions={ ['aaa', 'bbb'] }
        />
        <FieldForm
          type="select"
          keyName="language-english"
          label="Anglais: "
          selectOptions={ ['aaa', 'bbb'] }
        />
      </div>
    );
  }
}

export default TalentFormHead;