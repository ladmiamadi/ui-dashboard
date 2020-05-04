import React from 'react';
import SelectFormField from './utils/SelectFormField';
import TextFormField from './utils/TextFormField';

export class TalentFormHead extends React.Component {
  render() {
    return (
      <div className="form-head">
        <h1 className="talent-title">Gestion des talents: Nom Prénom</h1>
        <img src="https://place-hold.it/300x300" alt="pic"/>
        <div className="head-block">
          <TextFormField
            keyName="lastname"
            label="Nom: "
          />
          <TextFormField
            keyName="firstname"
            label="Prénom: "
          />
          <SelectFormField
            keyName="function"
            label="Fonction: "
            selectOptions={ ['aaa', 'bbb'] }
          />
          <TextFormField
            keyName="email"
            label="Mail: "
          />
          <TextFormField
            keyName="phone"
            label="Téléphone: "
          />
          <TextFormField
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