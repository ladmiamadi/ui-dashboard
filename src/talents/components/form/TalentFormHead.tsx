import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { TalentUserProfilesFilter } from '../../helpers/talentFilter';
import { UpdateUserPayload } from '../../state/models/user';

interface Props {
  talent: User,
  modifyUser: (payload: UpdateUserPayload) => void,
}

interface State {
  talent: User,
  userProfile: UserProfile,
}

export class TalentFormHead extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      talent: props.talent,
      userProfile: TalentUserProfilesFilter.filterByEnvironment(props.talent.userProfiles, 'working'),
    };
  }

  handleChange(category: string, property : string, event: any) {
    const payload = {
      category: category,
      property : property,
      value : event,
    };
    console.log(payload, 'handleChange payload');
    this.props.modifyUser(payload);
  }

  render() {
    console.log(this.state.userProfile, 'userprofile');
    console.log(this.state.talent, 'talent');

    return (
      <div className="form-head">
        <h1 className="talent-title">Gestion des talents: Nom Prénom</h1>
        <img src="https://place-hold.it/300x300" alt="pic"/>
        <div className="head-block">
          <FieldForm
            keyName="lastname"
            label="Nom: "
            type='text'
            handleChange ={ (event) => this.handleChange('userProfiles', 'lastName', event) }
            value={ this.state.userProfile }
          />
          <FieldForm
            keyName="firstname"
            label="Prénom: "
            type='text'
            handleChange ={ (event) => this.handleChange('userProfiles', 'firstName', event ) }
            value={ this.state.talent.userProfiles.map((elem) => elem.firstName) }
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
            handleChange ={ (event) => this.handleChange('userProfiles', 'email', event) }
            value={ this.state.talent.username }
          />
          <FieldForm
            keyName="phone"
            label="Téléphone: "
            type='text'
            handleChange ={ (event) => this.handleChange('userProfiles', 'phone', event) }
            value={ this.state.talent.userProfiles.map((elem) => elem.phone) }
          />
          <FieldForm
            keyName="place"
            label="Localisation: "
            type='text'
            handleChange ={ (event) => this.handleChange('userProfiles', 'place', event,) }
            value={ this.state.talent.userProfiles.map((elem) => elem)}
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

const mapState = (state: RootState) => ({
  talent: state.user.user
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormHead);
