import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
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

export class TalentFormAddress extends React.Component <Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      talent: this.props.talent,
      userProfile: TalentUserProfilesFilter.filterByEnvironment(props.talent.userProfiles, 'working'),
    };
  }

  handleChange(category: string, property : string, event: any) {
    const payload = {
      index: -1,
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
          keyName="street"
          label="Rue: "
          className="medium"
          type="text"
          handleChange={(event: MouseEvent) => this.handleChange('userAddress', 'street', event)}
          value={this.state.talent.userAddress?.street} />
        <FieldForm
          keyName="number"
          label="Num: "
          type="text"
          handleChange={(event: MouseEvent) => this.handleChange('userAddress', 'number', event)}
          value={this.state.talent.userAddress?.number} />
        <FieldForm
          keyName="postal-box"
          label="BP: "
          type="text"
          handleChange={(event: MouseEvent) => this.handleChange('userAddress', 'box', event)}
          value={this.state.talent.userAddress?.box} />
        <FieldForm
          keyName="postal-code"
          label="Code Postal: "
          type="text"
          handleChange={(event: MouseEvent) => this.handleChange('userAddress', 'zip-code', event)}
          value={this.state.talent.userAddress?.zipCode} />
        <FieldForm
          keyName="city"
          label="Ville: "
          className="medium"
          type="text"
          handleChange={(event: MouseEvent) => this.handleChange('userAddress', 'city', event)}
          value={this.state.talent.userAddress?.city} />
        <SelectFormField
          keyName="country"
          label="Pays: "
          options={['aaa', 'bbb']} />
        <FieldForm
          keyName="DOB"
          label="Date de naissance: "
          type="text"
          handleChange={(event: MouseEvent) => this.handleChange('userAddress', 'birthDate', event)}
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
  talent: state.user.user
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormAddress);
