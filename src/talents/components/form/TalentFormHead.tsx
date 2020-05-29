import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch } from '../../../app/state/store';

interface Props {
  talent: User,
  modifyUser: (event: any) => void,
}

interface State {
  value: string
}

export class TalentFormHead extends React.Component <Props, State> {
  handleChange(value : any, property : string) {
    const payload = {
      property : property,
      value : value
    };

    this.props.modifyUser(payload);
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
            handleChange ={ (event) => this.handleChange(event, 'lastname') }
            value={ this.props.talent.userProfiles.map((elem) => elem.lastName)}
          />
          <FieldForm
            keyName="firstname"
            label="Prénom: "
            type='text'
            handleChange ={ (event) => this.handleChange(event, 'firstname') }
            value={ this.props.talent.userProfiles.map((elem) => elem.firstName)}
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
            handleChange ={ (event) => this.handleChange(event, 'email') }
            value={ this.props.talent.username }
          />
          <FieldForm
            keyName="phone"
            label="Téléphone: "
            type='text'
            handleChange ={ (event) => this.handleChange(event, 'phone') }
            value={ this.props.talent.userProfiles.map((elem) => elem.phone)}
          />
          <FieldForm
            keyName="place"
            label="Localisation: "
            type='text'
            handleChange ={ (event) => this.handleChange(event, 'place') }
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

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(()=>({}), mapDispatch)(TalentFormHead);
