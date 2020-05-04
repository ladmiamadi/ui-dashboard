import React from 'react';
import SelectFormField from './utils/SelectFormField';
import TextFormField from './utils/TextFormField';

export class TalentFormAddress extends React.Component {
  render() {
    return (
      <div className="form-section">
        <TextFormField
          keyName="street"
          label="Rue: "
          className="medium"
        />
        <TextFormField
          keyName="number"
          label="Num: "
        />
        <TextFormField
          keyName="postal-box"
          label="BP: "
        />
        <TextFormField
          keyName="postal-code"
          label="Code Postal: "
        />
        <TextFormField
          keyName="city"
          label="Ville: "
          className="medium"
        />
        <SelectFormField
          keyName="country"
          label="Pays: "
          selectOptions={ ['aaa', 'bbb'] }
        />
        <TextFormField
          keyName="DOB"
          label="Date de naissance: "
        />
        <SelectFormField
          keyName="search"
          label="Actuellement en recherche: "
          selectOptions={ ['Oui', 'Non'] }
        />
      </div>
    );
  }
}

export default TalentFormAddress;