import React from 'react';
import { User } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';

interface Props {
  talent: User,
}

interface State {
  value: string
}

export class TalentFormHead extends React.Component <Props, State> {
  handleChange(value : any) {
    this.setState({ value : value });
    console.log(this.state.value, 'value of handlechange');
  }
  render() {
    return (
      <div className="form-head">
        <h1 className="talent-title">Gestion des talents: Nom Prénom</h1>
        <img src="https://place-hold.it/300x300" alt="pic"/>
        <div className="head-block">
          <FieldForm
            keyName="lastname"
            label="Nom: "
            type='text'
            handleChange ={this.handleChange}
            value={ this.props.talent.userProfiles.filter((profile) =>
              profile.environment === 'live').map((profile) => profile.lastName) }
          />
          <FieldForm
            keyName="firstname"
            label="Prénom: "
            type='text'
            handleChange ={this.handleChange}
            value={ this.props.talent.userProfiles.filter((profile) =>
              profile.environment === 'live').map((profile) => profile.firstName) }
          />
          <SelectFormField
            keyName="function"
            label="Fonction: "
            options={ ['aaa', 'bbb'] }
          />
          <FieldForm
            keyName="email"
            label="Mail: "
            type='text'
            handleChange ={this.handleChange}
            value={ this.props.talent.username }
          />
          <FieldForm
            keyName="phone"
            label="Téléphone: "
            type='text'
            handleChange ={this.handleChange}
            value={ this.props.talent.userProfiles.filter((profile) =>
              profile.environment === 'live').map((profile) => profile.phone) }
          />
          <FieldForm
            keyName="place"
            label="Localisation: "
            type='text'
            handleChange ={this.handleChange}
            value={ this.props.talent.userAddress?.city }
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
