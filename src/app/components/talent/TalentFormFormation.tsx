import FieldForm from './utils/FieldForm';
import React from 'react';

export class TalentFormHead extends React.Component {
  render() {
    return(
      <div className="form-section">
        <div className="section-add">
          <h6>Formations: </h6>
          <button className="form-add-button">Ajouter une formation</button>
        </div>
        <FieldForm
          type="text"
          keyName="formation-school"
          label="École: "
          className="large"
        />
        <FieldForm
          type="date"
          keyName="formation-start"
          label="Début formation: "
          className="medium"
        />
        <FieldForm
          type="date"
          keyName="formation-end"
          label="Fin: "
          className="medium"
        />
        <FieldForm
          type="text"
          keyName="formation-diploma"
          label="Diplôme obtenu: "
          className="large"
        />
      </div>
    );
  }
}

export default TalentFormHead;