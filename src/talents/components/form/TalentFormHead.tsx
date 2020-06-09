import React from 'react';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';

export class TalentFormHead extends React.Component {
  render() {
    return (
      <div className="form-head">
        <h1 className="talent-title">Gestion des talents: Nom Prénom</h1>
        <img src="https://place-hold.it/300x300" alt="pic"/>
        <div className="head-block">
          <FieldForm
            keyName="lastname"
            label="Nom: "
            type="text"
            value=""
            handleOnChange={() => {}}
          />
          <FieldForm
            keyName="firstname"
            label="Prénom: "
            type="text"
            value=""
            handleOnChange={() => {}}
          />
          <SelectFormField
            keyName="function"
            label="Fonction: "
            options={['aaa', 'bbb']}
            value="Aucun"
            handleOnChange={() => {}}
          />
          <FieldForm
            keyName="email"
            label="Mail: "
            type="text"
            value=""
            handleOnChange={() => {}}
          />
          <FieldForm
            keyName="phone"
            label="Téléphone: "
            type="text"
            value=""
            handleOnChange={() => {}}
          />
          <FieldForm
            keyName="place"
            label="Localisation: "
            type="text"
            value=""
            handleOnChange={() => {}}
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
