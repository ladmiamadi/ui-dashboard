import React from 'react';
import { FieldForm }  from '../../../app/components/utils/FieldForm';

export class TalentFormJob extends React.Component {
  render() {
    return (
      <div className="form-section">
        <FieldForm
          keyName="job-desired"
          label="Métier souhaité: "
          className="large"
          type="text"
        />
        <FieldForm
          keyName="job-mobility"
          label="Mobilité: "
          className="large"
          type="text"
        />
        <FieldForm
          keyName="job-description"
          label="Description: "
          className="large"
          rows={5}
          type="textarea"
        />
        <FieldForm
          keyName="job-actual-pay"
          label="Salaire actuel: "
          className="medium"
          type="text"
        />
        <FieldForm
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          className="medium"
          type="text"
        />
      </div>
    );
  }
}

export default TalentFormJob;
