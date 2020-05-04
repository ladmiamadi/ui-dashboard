import React from 'react';
import DateFormField from './utils/DateFormField';
import SelectFormField from './utils/SelectFormField';
import TextFormField from './utils/TextFormField';
import WorkingDaysFormField from './utils/WorkingDaysFormField';

export class TalentFormInternship extends React.Component {
  render() {
    return (
      <div className="form-section">
        <SelectFormField
          keyName="internship-status"
          label="Statut du stage: "
          options={ ['aaa', 'bbb'] }
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
        <WorkingDaysFormField
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