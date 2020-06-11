import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { TalentUserProfilesFilter } from '../../helpers/talentFilter';

interface Props {
  talent: User,
  modifyUser: (event: any) => void,
}

interface State {
  talent: User,
  userProfile: UserProfile,
}

export class TalentFormInstitution extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      talent: props.talent,
      userProfile: TalentUserProfilesFilter.filterByEnvironment(props.talent.userProfiles, 'working'),
    };
  }

  handleChange(category: string, property : string, event: any) {
    const payload = {
      index: 0,
      category: category,
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
          type="text"
          handleChange={(event) => this.handleChange('userProfiles', 'institution', event)}
          value={this.state.userProfile.institution} />
        <FieldForm
          keyName="institution-phone"
          label="Téléphone École: "
          className="medium"
          type="text"
          handleChange={(event) => this.handleChange('userProfiles', 'phoneInstitution', event)}
          value={this.state.userProfile.phoneInstitution} />
        <FieldForm
          keyName="institution-email"
          label="Mail École: "
          className="medium"
          type="text"
          handleChange={(event) => this.handleChange('userProfiles', 'mailInstitution', event)}
          value={this.state.userProfile.mailInstitution} />
        <FieldForm
          keyName="institution-contact"
          label="Personne de contact: "
          className="large"
          type="text"
          handleChange={(event) => this.handleChange('userProfiles', 'personContactInstitution', event)}
          value={this.state.userProfile.personContactInstitution} />
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
