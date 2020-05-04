import React from 'react';
import DateFormField from './utils/DateFormField';
import TextFormField from './utils/TextFormField';
import TextareaFormField from './utils/TextareaFormField';

export class TalentFormExperience extends React.Component {
  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Expérience: </h6>
          <button className="form-add-button">Ajouter une expérience</button>
        </div>
        <TextFormField
          keyName="experience-company"
          label="Entreprise: "
          className="large"
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
        <TextFormField
          keyName="experience-position"
          label="Poste: "
          className="large"
        />
        <TextareaFormField
          keyName="experience-works"
          label="Tâches effectuées: "
          className="large"
          rows={ 5 }
        />
      </div>
    );
  }
}

export default TalentFormExperience;