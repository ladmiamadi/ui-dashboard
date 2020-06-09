import React from 'react';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';

export class TalentFormAddress extends React.Component {
  render() {
    return (
      <div className="form-section">
        <FieldForm
          className="medium"
          keyName="street"
          label="Rue: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          keyName="number"
          label="Num: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          keyName="postal-box"
          label="BP: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          keyName="postal-code"
          label="Code Postal: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          className="medium"
          keyName="city"
          label="Ville: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <SelectFormField
          keyName="country"
          label="Pays: "
          options={['aaa', 'bbb']}
          value="Aucun"
          handleOnChange={() => {}}
        />
        <FieldForm
          keyName="DOB"
          label="Date de naissance: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <SelectFormField
          keyName="search"
          label="Actuellement en recherche: "
          options={['Oui', 'Non']}
          value="Aucun"
          handleOnChange={() => {}}
        />
      </div>
    );
  }
}

export default TalentFormAddress;