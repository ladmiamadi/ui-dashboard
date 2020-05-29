import React from 'react';
import { User } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';

interface Props {
  talent: User,
}

interface State {
  value: string
}

export class TalentFormLanguages extends React.Component<Props, State> {
  handleChange() {

  }
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
          options={ ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
          className="medium"
        />
        <SelectFormField
          keyName="language-english"
          label="Anglais: "
          options={ ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
          className="medium"
        />
      </div>
    );
  }
}

export default TalentFormLanguages;
