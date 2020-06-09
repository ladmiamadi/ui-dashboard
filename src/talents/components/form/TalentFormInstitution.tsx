import React from 'react';
import { FieldForm } from '../../../app/components/utils/FieldForm';

export class TalentFormInstitution extends React.Component {
  render() {
    return (
      <div className="form-section">
        <FieldForm
          className="large"
          keyName="institution"
          label="École: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          className="medium"
          keyName="institution-phone"
          label="Téléphone École: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          className="medium"
          keyName="institution-email"
          label="Mail École: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          className="large"
          keyName="institution-contact"
          label="Personne de contact: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
      </div>
    );
  }
}

export default TalentFormInstitution;
