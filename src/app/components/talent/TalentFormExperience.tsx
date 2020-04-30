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
        <FieldForm
          type="text"
          keyName="experience-company"
          label="Entreprise: "
          className="large"
        />
        <FieldForm
          type="date"
          keyName="experience-start"
          label="Début activité: "
          className="medium"
        />
        <FieldForm
          type="date"
          keyName="experience-end"
          label="Fin: "
          className="medium"
        />
        <FieldForm
          type="text"
          keyName="experience-position"
          label="Poste: "
          className="large"
        />
        <FieldForm
          type="textarea"
          keyName="experience-works"
          label="Tâches effectuées: "
          className="large"
          rows={ 5 }
        />
      </div>
    );
  }
}

export default TalentFormHead;