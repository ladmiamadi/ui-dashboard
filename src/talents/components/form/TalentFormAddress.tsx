import React from 'react';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';

export class TalentFormAddress extends React.Component {
  render() {
    return (
      <div className="form-section">
        <FieldForm
          keyName="street"
          label="Rue: "
          className="medium"
          type='text'
        />
        <FieldForm
          keyName="number"
          label="Num: "
          type='text'
        />
        <FieldForm
          keyName="postal-box"
          label="BP: "
          type='text'
        />
        <FieldForm
          keyName="postal-code"
          label="Code Postal: "
          type='text'
        />
        <FieldForm
          keyName="city"
          label="Ville: "
          className="medium"
          type='text'
        />
        <SelectFormField
          keyName="country"
          label="Pays: "
          options={ ['aaa', 'bbb'] }
        />
        <FieldForm
          keyName="DOB"
          label="Date de naissance: "
          type='text'
        />
        <SelectFormField
          keyName="search"
          label="Actuellement en recherche: "
          options={ ['Oui', 'Non'] }
        />
      </div>
    );
  }
}

export default TalentFormAddress;
