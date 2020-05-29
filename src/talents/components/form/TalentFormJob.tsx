import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { FieldForm }  from '../../../app/components/utils/FieldForm';
import { RootDispatch } from '../../../app/state/store';

interface Props {
  talent: User,
  modifyUser: (event: any) => void,
}

interface State {
  value: string
}

export class TalentFormJob extends React.Component<Props, State> {
  handleChange(value : any, property : string) {
    const payload = {
      property : property,
      value : value
    };

    this.props.modifyUser(payload);
  }

  render() {
    return (
      <div className="form-section">
        <FieldForm
          keyName="job-desired"
          label="Métier souhaité: "
          className="large"
          type='text'
          handleChange ={ (event) => this.handleChange(event, 'job-desired') }
          value={ this.props.talent.userProfiles.map((elem) => elem.desiredJob) }
        />
        <FieldForm
          keyName="job-mobility"
          label="Mobilité: "
          className="large"
          type='text'
          handleChange ={ (event) => this.handleChange(event, 'job-mobility') }
          value={ this.props.talent.userProfiles.map((elem) => elem.mobility) }
        />
        <FieldForm
          keyName="job-description"
          label="Description: "
          className="large"
          rows={ 5 }
          type='textarea'
          handleChange ={ (event) => this.handleChange(event, 'job-description') }
          value={ this.props.talent.userProfiles.map((elem) => elem.descriptionInFrench) }
        />
        <FieldForm
          keyName="job-actual-pay"
          label="Salaire actuel: "
          className="medium"
          type='text'
          handleChange ={ (event) => this.handleChange(event, 'job-actual-pay') }
          value={ this.props.talent.userProfiles.map((elem) => elem.actualSalary) }
        />
        <FieldForm
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          className="medium"
          type='text'
          handleChange ={ (event) => this.handleChange(event, 'job-desired-pay') }
          value={ this.props.talent.userProfiles.map((elem) => elem.expectedSalary) }
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(() => {}, mapDispatch)(TalentFormJob);

