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
          className="large"
          keyName="formation-school"
          label="École: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
        <DateFormField
          className="medium"
          keyName="formation-start"
          label="Début formation: "
          values={{ day: 1, month: 1, year: 2000 }}
          yearSegment={{ yearStart: 2000, yearEnd: 2100 }}
          handleOnChange={() => {}}
        />
        <DateFormField
          className="medium"
          keyName="formation-end"
          label="Fin: "
          values={{ day: 1, month: 1, year: 2000 }}
          yearSegment={{ yearStart: 2000, yearEnd: 2100 }}
          handleOnChange={() => {}}
        />
        <FieldForm
          className="large"
          keyName="formation-diploma"
          label="Diplôme obtenu: "
          type="text"
          value=""
          handleOnChange={() => {}}
        />
      </div>
    );
  }
}

export default TalentFormFormation;
