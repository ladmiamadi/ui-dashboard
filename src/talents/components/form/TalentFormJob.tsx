import React from 'react';
import TextFormField from './utils/TextFormField';
import TextareaFormField from './utils/TextareaFormField';

export class TalentFormJob extends React.Component {
  render() {
    return (
      <div className="form-section">
        <TextFormField
          keyName="job-wished"
          label="Métier souhaité: "
          className="large"
        />
        <TextFormField
          keyName="job-mobility"
          label="Mobilité: "
          className="large"
        />
        <TextareaFormField
          keyName="job-description"
          label="Description: "
          className="large"
          rows={ 5 }
        />
        <TextFormField
          keyName="job-actual-pay"
          label="Salaire actuel: "
          className="medium"
        />
        <TextFormField
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          className="medium"
        />
      </div>
    );
  }
}

export default TalentFormJob;