import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { FieldForm }  from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';

interface Props {
  talent: User,
  modifyUser: (event: any) => void,
}

interface State {
  talent: User,
}

export class TalentFormJob extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      talent: this.props.talent,
    };
  }

  handleChange(property : string, event: MouseEvent) {
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
          keyName="job-desired"
          label="Métier souhaité: "
          className="large"
          type='text'
          handleChange ={ (event) => this.handleChange('job-desired', event) }
          value={ this.state.talent.userProfiles.map((elem) => elem.desiredJob) }
        />
        <FieldForm
          keyName="job-mobility"
          label="Mobilité: "
          className="large"
          type='text'
          handleChange ={ (event) => this.handleChange('job-mobility', event) }
          value={ this.state.talent.userProfiles.map((elem) => elem.mobility) }
        />
        <FieldForm
          keyName="job-description"
          label="Description: "
          className="large"
          rows={ 5 }
          type='textarea'
          handleChange ={ (event) => this.handleChange('job-description', event) }
          value={ this.state.talent.userProfiles.map((elem) => elem.descriptionInFrench) }
        />
        <FieldForm
          keyName="job-actual-pay"
          label="Salaire actuel: "
          className="medium"
          type='text'
          handleChange ={ (event) => this.handleChange('job-actual-pay', event) }
          value={ this.state.talent.userProfiles.map((elem) => elem.actualSalary) }
        />
        <FieldForm
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          className="medium"
          type='text'
          handleChange ={ (event) => this.handleChange('job-desired-pay', event) }
          value={ this.state.talent.userProfiles.map((elem) => elem.expectedSalary) }
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

export default connect(mapState, mapDispatch)(TalentFormJob);

