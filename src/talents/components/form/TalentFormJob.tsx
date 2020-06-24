import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { FieldForm }  from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { TalentUserProfilesFilter } from '../../helpers/talentFilter';
import { UpdateUserPayload } from '../../state/models/user';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

interface State {
  user: User,
  userProfile?: UserProfile,
}

export class TalentFormJob extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      user: props.user,
      userProfile: TalentUserProfilesFilter.filterByEnvironment(props.user.userProfiles, 'working'),
    };
  }

  handleChange(category: string, property : string, value: string) {
    const payload = {
      index: 0,
      category: category,
      property: property,
      value: value,
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
          handleChange={(value) => this.handleChange('userProfiles','desiredJob', value)}
          value={this.state.userProfile?.desiredJob} />
        <FieldForm
          keyName="job-mobility"
          label="Mobilité: "
          className="large"
          type="text"
          handleChange={(value) => this.handleChange('userProfiles','mobility', value)}
          value={this.state.userProfile?.mobility} />
        <FieldForm
          keyName="job-description"
          label="Description: "
          className="large"
          rows={5}
          type="textarea"
          handleChange={(value) => this.handleChange('userProfiles','descriptionInFrench', value)}
          value={this.state.userProfile?.descriptionInFrench} />
        <FieldForm
          keyName="job-actual-pay"
          label="Salaire actuel: "
          className="medium"
          type="text"
          handleChange={(value) => this.handleChange('userProfiles', 'actualSalary', value)}
          value={this.state.userProfile?.actualSalary} />
        <FieldForm
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          className="medium"
          type="text"
          handleChange={(value) => this.handleChange('userProfiles', 'expectedSalary', value)}
          value={this.state.userProfile?.expectedSalary} />
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormJob);

