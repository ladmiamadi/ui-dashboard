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
          className="large"
        />
        <FieldForm
          type="text"
          keyName="job-mobility"
          label="Mobilité: "
          className="large"
        />
        <FieldForm
          type="textarea"
          keyName="job-description"
          label="Description: "
          className="large"
        />
        <FieldForm
          type="text"
          keyName="job-actual-pay"
          label="Salaire actuel: "
          className="medium"
        />
        <FieldForm
          type="text"
          keyName="job-wished-pay"
          label="Salaire souhaité: "
          className="medium"
        />
      </div>
    );
  }
}

export default TalentFormHead;