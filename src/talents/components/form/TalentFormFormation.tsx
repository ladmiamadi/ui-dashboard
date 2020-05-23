import React from 'react';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';

export class TalentFormFormation extends React.Component {
  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Formations: </h6>
          <button className="form-add-button">Ajouter une formation</button>
        </div>
        <FieldForm
          keyName="formation-school"
          label="École: "
          className="large"
          type='text'
        />
        <DateFormField
          keyName="formation-start"
          label="Début formation: "
          className="medium"
        />
        <DateFormField
          keyName="formation-end"
          label="Fin: "
          className="medium"
        />
        <FieldForm
          keyName="formation-diploma"
          label="Diplôme obtenu: "
          className="large"
          type='text'
        />
      </div>
    );
  }
}

export default TalentFormFormation;
