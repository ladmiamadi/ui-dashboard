import React from 'react';
import TextFormField from './utils/TextFormField';

export class TalentFormSchool extends React.Component {
  render() {
    return (
      <div className="form-section">
        <TextFormField
          keyName="school"
          label="École: "
          className="large"
        />
        <TextFormField
          keyName="school-phone"
          label="Téléphone École: "
          className="medium"
        />
        <TextFormField
          keyName="school-email"
          label="Mail École: "
          className="medium"
        />
        <TextFormField
          keyName="school-contact"
          label="Personne de contact: "
          className="large"
        />
      </div>
    );
  }
}

export default TalentFormSchool;