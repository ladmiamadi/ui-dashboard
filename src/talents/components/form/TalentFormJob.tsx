import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { FieldForm }  from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { TalentUserProfilesFilter } from '../../helpers/talentFilter';
import { UpdateUserPayload } from '../../state/models/user';

interface Props {
  talent: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

interface State {
  talent: User,
  userProfile: UserProfile,
}

export class TalentFormJob extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      talent: props.talent,
      userProfile: TalentUserProfilesFilter.filterByEnvironment(props.talent.userProfiles, 'working'),
    };
  }

  handleChange(category: string, property : string, event: string) {
    const payload = {
      index: 0,
      category: category,
      property: property,
      value: event,
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
          type="text"
          handleChange={(event) => this.handleChange('userProfiles','desiredJob', event)}
          value={this.state.userProfile.desiredJob} />
        <FieldForm
          keyName="job-mobility"
          label="Mobilité: "
          className="large"
          type="text"
          handleChange={(event) => this.handleChange('userProfiles','mobility', event)}
          value={this.state.userProfile.mobility} />
        <FieldForm
          keyName="job-description"
          label="Description: "
          className="large"
          rows={5}
          type="textarea"
          handleChange={(event) => this.handleChange('userProfiles','descriptionInFrench', event)}
          value={this.state.userProfile.descriptionInFrench} />
        <FieldForm
          keyName="job-actual-pay"
          label="Salaire actuel: "
          className="medium"
          type="text"
          handleChange={(event) => this.handleChange('userProfiles', 'actualSalary', event)}
          value={this.state.userProfile.actualSalary} />
        <FieldForm
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          className="medium"
          type="text"
          handleChange={(event) => this.handleChange('userProfiles', 'expectedSalary', event)}
          value={this.state.userProfile.expectedSalary} />
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  talent: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormJob);

