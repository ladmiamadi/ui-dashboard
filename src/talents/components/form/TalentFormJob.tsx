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
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          keyName="job-mobility"
          label="Mobilité: "
          className="large"
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          keyName="job-description"
          label="Description: "
          className="large"
          rows={5}
          type="textarea"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          keyName="job-actual-pay"
          label="Salaire actuel: "
          className="medium"
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          className="medium"
          type="text"
          value=""
          handleOnChange={() => {}}
        />
      </div>
    );
  }
}

export default TalentFormJob;
