import React from 'react';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';

export class TalentFormInternship extends React.Component {
  render() {
    return (
      <div className="form-section">
        <SelectFormField
          keyName="internship-status"
          label="Statut du stage: "
          options={['aaa', 'bbb']}
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
          checkboxes={['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche']}
        />
        <FieldForm
          keyName="internship-hours"
          label="Horaire: "
          className="large"
          type='text'
        />
      </div>
    );
  }
}

export default TalentFormInternship;
