import React from 'react';
import { User } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';

interface Props {
  talent: User,
}

interface State {
  value: string
}

export class TalentFormInstitution extends React.Component<Props, State> {
  handleChange(value : any) {
    this.setState({ value : value });
    console.log(this.state.value, 'value of handlechange');
  }
  render() {
    return (
      <div className="form-section">
        <FieldForm
          keyName="institution"
          label="École: "
          className="large"
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userProfiles.map((elem) => elem.institution) }
        />
        <FieldForm
          keyName="institution-phone"
          label="Téléphone École: "
          className="medium"
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userProfiles.map((elem) => elem.phoneInstitution) }

        />
        <FieldForm
          keyName="institution-email"
          label="Mail École: "
          className="medium"
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userProfiles.map((elem) =>elem.mailInstitution) }
        />
        <FieldForm
          keyName="institution-contact"
          label="Personne de contact: "
          className="large"
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userProfiles.map((elem) =>elem.personContactInstitution) }
        />
      </div>
    );
  }
}

export default TalentFormInstitution;
