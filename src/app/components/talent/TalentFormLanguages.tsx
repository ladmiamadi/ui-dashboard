import FieldForm from './utils/FieldForm';
import React from 'react';

export class TalentFormHead extends React.Component {
  render() {
    return(
      <div className="form-section">
        <div className="section-add">
          <h6>Langues: </h6>
          <button className="form-add-button">Ajouter une langue</button>
        </div>
        <FieldForm
          type="select"
          keyName="language-french"
          label="Français: "
          selectOptions={ ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
          className="medium"
        />
        <FieldForm
          type="select"
          keyName="language-english"
          label="Anglais: "
          selectOptions={ ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
          className="medium"
        />
      </div>
    );
  }
}

export default TalentFormHead;