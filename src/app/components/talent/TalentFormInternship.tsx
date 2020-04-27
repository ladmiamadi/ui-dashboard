import FieldForm from './utils/FieldForm';
import React from 'react';

export class TalentFormHead extends React.Component {
  render() {
    return(
      <div className="form-section">
        <FieldForm
          type="select"
          keyName="internship-status"
          label="Statut du stage: "
          selectOptions={ ['aaa', 'bbb'] }
        />
        <FieldForm
          type="date"
          keyName="internship-start"
          label="Début: "
        />
        <FieldForm
          type="date"
          keyName="internship-end"
          label="Fin: "
        />
        <FieldForm
          type="checkbox"
          keyName="internship-days"
          label="Jour(s) d'activité: "
        />
        <FieldForm
          type="text"
          keyName="internship-hours"
          label="Horaire: "
        />
      </div>
    );
  }
}

export default TalentFormHead;