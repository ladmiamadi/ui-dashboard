import React from 'react';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { Checkbox } from '../../../app/';

export class TalentFormInternship extends React.Component {
  render() {
    const checkboxes: Checkbox[] = [
      { label: 'lundi', checked: false },
      { label: 'mardi', checked: false } ,
      { label: 'mercredi', checked: false },
      { label: 'jeudi', checked: false },
      { label: 'vendredi', checked: false },
      { label: 'samedi', checked: false },
      { label: 'dimanche', checked: false },
    ];

    return (
      <div className="form-section">
        <SelectFormField
          className="large"
          keyName="internship-status"
          label="Statut du stage: "
          options={['aaa', 'bbb']}
          value="Aucun"
          handleOnChange={() => {}}
        />
        <DateFormField
          keyName="internship-start"
          label="Début: "
          values={{ day: 1, month: 1, year: 2000 }}
          yearSegment={{ yearStart: 2000, yearEnd: 2100 }}
          handleOnChange={() => {}}
        />
        <DateFormField
          keyName="internship-end"
          label="Fin: "
          values={{ day: 1, month: 1, year: 2000 }}
          yearSegment={{ yearStart: 2000, yearEnd: 2100 }}
          handleOnChange={() => {}}
        />
        <CheckboxFormField
          checkboxes={checkboxes}
          className="large days"
          keyName="internship-days"
          label="Jour(s) d'activité: "
          handleOnChange={() => {}}
        />
        <FieldForm
          className="large"
          keyName="internship-hours"
          label="Horaire: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
      </div>
    );
  }
}

export default TalentFormInternship;
