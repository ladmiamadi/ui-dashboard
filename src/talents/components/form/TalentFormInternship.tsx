import React from 'react';
import CheckboxFormField from './utils/CheckboxFormField';
import DateFormField from './utils/DateFormField';
import SelectFormField from './utils/SelectFormField';
import TextFormField from './utils/TextFormField';

export class TalentFormInternship extends React.Component {
  render() {
    return (
      <div className="form-section">
        <SelectFormField
          keyName="internship-status"
          label="Statut du stage: "
          selectOptions={ ['aaa', 'bbb'] }
          className="large"
        />
        <DateFormField
          keyName="internship-start"
          label="Début: "
        />
        <DateFormField
          keyName="internship-end"
          label="Fin: "
        />
        <CheckboxFormField
          keyName="internship-days"
          label="Jour(s) d'activité: "
          className="large days"
        />
        <TextFormField
          keyName="internship-hours"
          label="Horaire: "
          className="large"
        />
      </div>
    );
  }
}

export default TalentFormInternship;