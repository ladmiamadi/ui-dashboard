import FieldForm from './utils/FieldForm';
import React from 'react';

export class TalentFormHead extends React.Component {
  render() {
    return(
      <div className="form-section">
        <FieldForm
          type="text"
          keyName="street"
          label="Rue: "
        />
        <FieldForm
          type="text"
          keyName="number"
          label="Num: "
        />
        <FieldForm
          type="text"
          keyName="postal-box"
          label="BP: "
        />
        <FieldForm
          type="text"
          keyName="postal-code"
          label="Code Postal: "
        />
        <FieldForm
          type="text"
          keyName="city"
          label="Ville: "
        />
        <FieldForm
          type="select"
          keyName="country"
          label="Pays: "
          selectOptions={ ['aaa', 'bbb'] }
        />
        <FieldForm
          type="date"
          keyName="DOB"
          label="Date de naissance: "
        />
        <FieldForm
          type="select"
          keyName="search"
          label="Actuellement en recherche: "
          selectOptions={ ['aaa', 'bbb'] }
        />
      </div>
    );
  }
}

export default TalentFormHead;