import FieldForm from './utils/FieldForm';
import React from 'react';

export class TalentFormHead extends React.Component {
  render() {
    return(
      <div className="form-head">
        <h1 className="talent-title">Gestion des talents: Nom Prénom</h1>
        <img src="" alt=""/>
        <div className="head-block">
          <FieldForm
            type="text"
            keyName="lastname"
            label="Nom: "
          />
          <FieldForm
            type="text"
            keyName="firstname"
            label="Prénom: "
          />
          <FieldForm
            type="select"
            keyName="function"
            label="Fonction: "
            selectOptions={ ['aaa', 'bbb'] }
          />
          <FieldForm
            type="text"
            keyName="mail"
            label="Mail: "
          />
          <FieldForm
            type="text"
            keyName="phone"
            label="Téléphone: "
          />
          <FieldForm
            type="text"
            keyName="place"
            label="Localisation: "
          />
        </div>
        <div className="connexion-box">
          <p>Envoyez un email pour configurer la connexion</p>
          <button>Envoyer</button>
        </div>
      </div>
    );
  }
}

export default TalentFormHead;