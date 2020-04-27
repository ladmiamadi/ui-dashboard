import FieldForm from './utils/FieldForm';
import React from 'react';

export class TalentFormHead extends React.Component {
  render() {
    return(
      <div className="form-section">
        <FieldForm
          type="text"
          keyName="school"
          label="École: "
        />
        <FieldForm
          type="text"
          keyName="school-phone"
          label="Téléphone École: "
        />
        <FieldForm
          type="text"
          keyName="school-mail"
          label="Mail École: "
        />
        <FieldForm
          type="text"
          keyName="school-contact"
          label="Personne de contact: "
        />
      </div>
    );
  }
}

export default TalentFormHead;