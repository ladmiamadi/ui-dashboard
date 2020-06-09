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
          className="large"
          keyName="experience-company"
          label="Entreprise: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <DateFormField
          className="medium"
          keyName="experience-start"
          label="Début activité: "
          values={{ day: 1, month: 1, year: 2000 }}
          yearSegment={{ yearStart: 2000, yearEnd: 2100 }}
          handleOnChange={() => {}}
        />
        <DateFormField
          className="medium"
          keyName="experience-end"
          label="Fin: "
          values={{ day: 1, month: 1, year: 2000 }}
          yearSegment={{ yearStart: 2000, yearEnd: 2100 }}
          handleOnChange={() => {}}

        />
        <FieldForm
          className="large"
          keyName="experience-position"
          label="Poste: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <FieldForm
          className="large"
          keyName="experience-works"
          label="Tâches effectuées: "
          rows={5}
          type="textarea"
          value=""
          handleOnChange={() => {}}
        />
      </div>
    );
  }
}

export default TalentFormExperience;
