import React from 'react';
import { FieldForm } from '../../../app/components/utils/FieldForm';

export class TalentFormInstitution extends React.Component {
  render() {
    return (
      <div className="form-section">
        <FieldForm
          keyName="institution"
          label="École: "
          className="large"
          type="text"
        />
        <FieldForm
          keyName="institution-phone"
          label="Téléphone École: "
          className="medium"
          type="text"
        />
        <FieldForm
          keyName="institution-email"
          label="Mail École: "
          className="medium"
          type="text"
        />
        <FieldForm
          keyName="institution-contact"
          label="Personne de contact: "
          className="large"
          type="text"
        />
      </div>
    );
  }
}

export default TalentFormInstitution;
