import React from 'react';
import { FieldForm }  from '../../../app/components/utils/FieldForm';

export class TalentFormJob extends React.Component {
  render() {
    return (
      <div className="form-section">
        <FieldForm
          className="large"
          keyName="job-desired"
          label="Métier souhaité: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          className="large"
          keyName="job-mobility"
          label="Mobilité: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          className="large"
          keyName="job-description"
          label="Description: "
          rows={5}
          type="textarea"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          className="medium"
          keyName="job-actual-pay"
          label="Salaire actuel: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          className="medium"
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
      </div>
    );
  }
}

export default TalentFormJob;
