import FieldForm from './utils/FieldForm';
import React from 'react';

export class TalentFormHead extends React.Component {
  render() {
    return(
      <div className="form-section">
        <FieldForm
          type="text"
          keyName="job-wished"
          label="Métier souhaité: "
        />
        <FieldForm
          type="text"
          keyName="job-mobility"
          label="Mobilité: "
        />
        <FieldForm
          type="textarea"
          keyName="job-description"
          label="Description: "
        />
        <FieldForm
          type="text"
          keyName="job-actual-pay"
          label="Salaire actuel: "
        />
        <FieldForm
          type="text"
          keyName="job-wished-pay"
          label="Salaire souhaité: "
        />
      </div>
    );
  }
}

export default TalentFormHead;