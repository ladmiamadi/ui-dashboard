import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { TalentUserProfilesFilter } from '../../helpers/talentFilter';
import { UpdateUserPayload } from '../../state/models/user';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

interface State {
  user: User,
  userProfile: UserProfile,
}

export class TalentFormInstitution extends React.Component<Props, State> {
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
          keyName="institution"
          label="École: "
          className="large"
          type="text"
          handleChange={(value) => this.handleChange('userProfiles', 'institution', value)}
          value={this.state.userProfile.institution} />
        <FieldForm
          keyName="institution-phone"
          label="Téléphone École: "
          className="medium"
          type="text"
          handleChange={(value) => this.handleChange('userProfiles', 'phoneInstitution', value)}
          value={this.state.userProfile.phoneInstitution} />
        <FieldForm
          keyName="institution-email"
          label="Mail École: "
          className="medium"
          type="text"
          handleChange={(value) => this.handleChange('userProfiles', 'mailInstitution', value)}
          value={this.state.userProfile.mailInstitution} />
        <FieldForm
          keyName="institution-contact"
          label="Personne de contact: "
          className="large"
          type="text"
          handleChange={(value) => this.handleChange('userProfiles', 'personContactInstitution', value)}
          value={this.state.userProfile.personContactInstitution} />
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

export default connect(mapState, mapDispatch)(TalentFormInstitution);
