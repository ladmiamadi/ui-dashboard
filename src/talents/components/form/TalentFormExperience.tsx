import React from 'react';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';

export class TalentFormExperience extends React.Component {
  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Expérience: </h6>
          <button className="form-add-button">Ajouter une expérience</button>
        </div>
        <FieldForm
          keyName="experience-company"
          label="Entreprise: "
          className="large"
          type='text'
        />
        <DateFormField
          keyName="experience-start"
          label="Début activité: "
          className="medium"
        />
        <DateFormField
          keyName="experience-end"
          label="Fin: "
          className="medium"
        />
        <FieldForm
          keyName="experience-position"
          label="Poste: "
          className="large"
          type='text'
        />
        <FieldForm
          keyName="experience-works"
          label="Tâches effectuées: "
          className="large"
          rows={5}
          type='textarea'
        />
      </div>
    );
  }
}

export default TalentFormExperience;
