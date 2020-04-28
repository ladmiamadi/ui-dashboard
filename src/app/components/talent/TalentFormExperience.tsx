import FieldForm from './utils/FieldForm';
import React from 'react';

export class TalentFormHead extends React.Component {
  render() {
    return(
      <div className="form-section">
        <div className="section-add">
          <h6>Expérience: </h6>
          <button className="form-add-button">Ajouter une expérience</button>
        </div>
        <div className="add-section">
          <FieldForm
            type="text"
            keyName="experience-company"
            label="Entreprise: "
          />
          <FieldForm
            type="date"
            keyName="experience-start"
            label="Début activité: "
          />
          <FieldForm
            type="date"
            keyName="experience-end"
            label="Fin: "
          />
          <FieldForm
            type="text"
            keyName="experience-position"
            label="Poste: "
          />
          <FieldForm
            type="textarea"
            keyName="experience-works"
            label="Tâches effectuées: "
          />
        </div>
      </div>
    );
  }
}

export default TalentFormHead;