import React from 'react';
import { User } from '../../../app';
import { FieldForm }  from '../../../app/components/utils/FieldForm';

interface Props {
  talent: User,
}

interface State {
  value: string
}

export class TalentFormJob extends React.Component<Props, State> {
  handleChange(value : any) {
    this.setState({ value : value });
    console.log(this.state.value, 'value of handlechange');
  }
  render() {
    return (
      <div className="form-section">
        <FieldForm
          keyName="job-desired"
          label="Métier souhaité: "
          className="large"
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userProfiles.filter((profile) =>
            profile.environment === 'live').map((profile) => profile.desiredJob) }
        />
        <FieldForm
          keyName="job-mobility"
          label="Mobilité: "
          className="large"
          type='text'
          handleChange ={this.handleChange}
        />
        <FieldForm
          keyName="job-description"
          label="Description: "
          className="large"
          rows={ 5 }
          type='textarea'
          handleChange ={this.handleChange}
        />
        <FieldForm
          keyName="job-actual-pay"
          label="Salaire actuel: "
          className="medium"
          type='text'
          handleChange ={this.handleChange}
        />
        <FieldForm
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          className="medium"
          type='text'
          handleChange ={this.handleChange}
        />
      </div>
    );
  }
}

export default TalentFormJob;
