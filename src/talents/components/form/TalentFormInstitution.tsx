import React from 'react';
import TextFormField from './utils/TextFormField';

export class TalentFormInstitution extends React.Component {
  render() {
    return (
      <div className="form-section">
        <TextFormField
          keyName="institution"
          label="École: "
          className="large"
        />
        <TextFormField
          keyName="institution-phone"
          label="Téléphone École: "
          className="medium"
        />
        <TextFormField
          keyName="institution-email"
          label="Mail École: "
          className="medium"
        />
        <TextFormField
          keyName="institution-contact"
          label="Personne de contact: "
          className="large"
        />
      </div>
    );
  }
}

export default TalentFormInstitution;