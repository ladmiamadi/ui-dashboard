import React from 'react';
import SelectFormField from './utils/SelectFormField';

export class TalentFormLanguages extends React.Component {
  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Langues: </h6>
          <button className="form-add-button">Ajouter une langue</button>
        </div>
        <SelectFormField
          keyName="language-french"
          label="Français: "
          selectOptions={ ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
          className="medium"
        />
        <SelectFormField
          keyName="language-english"
          label="Anglais: "
          selectOptions={ ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
          className="medium"
        />
      </div>
    );
  }
}

export default TalentFormLanguages;