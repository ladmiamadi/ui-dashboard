import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
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

export class TalentFormAddress extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      user: props.user,
      userProfile: TalentUserProfilesFilter.filterByEnvironment(props.user.userProfiles, 'working'),
    };
  }

  handleChange(category: string, property: string, value: string) {
    const payload = {
      index: -1,
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
          keyName="street"
          label="Rue: "
          className="medium"
          type="text"
          handleChange={(value: string) => this.handleChange('userAddress', 'street', value)}
          value={this.state.user.userAddress?.street} />
        <FieldForm
          keyName="number"
          label="Num: "
          type="text"
          handleChange={(value: string) => this.handleChange('userAddress', 'number', value)}
          value={this.state.user.userAddress?.number} />
        <FieldForm
          keyName="postal-box"
          label="BP: "
          type="text"
          handleChange={(value: string) => this.handleChange('userAddress', 'box', value)}
          value={this.state.user.userAddress?.box} />
        <FieldForm
          keyName="postal-code"
          label="Code Postal: "
          type="text"
          handleChange={(value: string) => this.handleChange('userAddress', 'zip-code', value)}
          value={this.state.user.userAddress?.zipCode} />
        <FieldForm
          keyName="city"
          label="Ville: "
          className="medium"
          type="text"
          handleChange={(value: string) => this.handleChange('userAddress', 'city', value)}
          value={this.state.user.userAddress?.city} />
        <SelectFormField
          keyName="country"
          label="Pays: "
          options={['aaa', 'bbb']} />
        <FieldForm
          keyName="DOB"
          label="Date de naissance: "
          type="text"
          handleChange={(value: string) => this.handleChange('userAddress', 'birthDate', value)}
          value={this.state.userProfile.birthDate} />
        <SelectFormField
          keyName="search"
          label="Actuellement en recherche: "
          options={['Oui', 'Non']} />
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

export default connect(mapState, mapDispatch)(TalentFormAddress);
