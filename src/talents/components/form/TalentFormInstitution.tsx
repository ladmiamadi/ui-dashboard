import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';

interface Props {
  talent: User,
  modifyUser: (event: any) => void,
}

interface State {
  talent: User,
}

export class TalentFormInstitution extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      talent: this.props.talent,
    };
  }

  handleChange(property : string, event: any) {
    const payload = {
      property : property,
      value : event,
    };

    this.props.modifyUser(payload);
  }

  render() {
    return (
      <div className="form-section">
        <FieldForm
          keyName="institution"
          label="École: "
          className="large"
          type='text'
          handleChange ={ (event) => this.handleChange('institution', event) }
          value={ this.state.talent.userProfiles.map((elem) => elem.institution) }
        />
        <FieldForm
          keyName="institution-phone"
          label="Téléphone École: "
          className="medium"
          type='text'
          handleChange ={ (event) => this.handleChange('institution-phone', event) }
          value={ this.state.talent.userProfiles.map((elem) => elem.phoneInstitution) }
        />
        <FieldForm
          keyName="institution-email"
          label="Mail École: "
          className="medium"
          type='text'
          handleChange ={ (event) => this.handleChange('institution-email', event) }
          value={ this.state.talent.userProfiles.map((elem) => elem.mailInstitution) }
        />
        <FieldForm
          keyName="institution-contact"
          label="Personne de contact: "
          className="large"
          type='text'
          handleChange ={ (event) => this.handleChange('institution-contact', event) }
          value={ this.state.talent.userProfiles.map((elem) => elem.personContactInstitution) }
        />
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

export default connect(mapState, mapDispatch)(TalentFormInstitution);
