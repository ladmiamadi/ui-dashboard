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
          className="large"
        />
        <FieldForm
          type="text"
          keyName="school-phone"
          label="Téléphone École: "
          className="medium"
        />
        <FieldForm
          type="text"
          keyName="school-email"
          label="Mail École: "
          className="medium"
        />
        <FieldForm
          type="text"
          keyName="school-contact"
          label="Personne de contact: "
          className="large"
        />
      </div>
    );
  }
}

export default TalentFormHead;