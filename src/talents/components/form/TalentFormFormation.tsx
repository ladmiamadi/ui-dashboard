import React from 'react';
import DateFormField from './utils/DateFormField';
import TextFormField from './utils/TextFormField';

export class TalentFormFormation extends React.Component {
  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Formations: </h6>
          <button className="form-add-button">Ajouter une formation</button>
        </div>
        <TextFormField
          keyName="formation-school"
          label="École: "
          className="large"
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
        <TextFormField
          keyName="formation-diploma"
          label="Diplôme obtenu: "
          className="large"
        />
      </div>
    );
  }
}

export default TalentFormFormation;