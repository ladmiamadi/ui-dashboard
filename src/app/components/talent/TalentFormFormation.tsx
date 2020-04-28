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
        <div className="add-section">
          <FieldForm
            type="text"
            keyName="formation-school"
            label="École: "
          />
          <FieldForm
            type="date"
            keyName="formation-start"
            label="Début formation: "
          />
          <FieldForm
            type="date"
            keyName="formation-end"
            label="Fin: "
          />
          <FieldForm
            type="text"
            keyName="formation-diploma"
            label="Diplôme obtenu: "
          />
        </div>
      </div>
    );
  }
}

export default TalentFormHead;