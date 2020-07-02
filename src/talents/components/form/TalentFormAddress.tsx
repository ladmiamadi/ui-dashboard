import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ProfileCollection from '../../helpers/ProfileCollection';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export class TalentFormAddress extends React.Component<Props> {
  render() {
    const indexWorking: number = ProfileCollection.findWorkingIndex(this.props.user.userProfiles);
    const userProfileWorking: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles,
      'working',
    );

    return (
      <div className="form-section">
        <FieldForm
          keyName="street"
          label="Rue: "
          className="medium"
          type="text"
          handleChange={(value: string) => this.props.modifyUser({
            category: 'userAddress',
            property: 'street',
            value: value,
            index: -1,
          })}
          value={this.props.user.userAddress?.street} />
        <FieldForm
          keyName="number"
          label="Num: "
          type="text"
          handleChange={(value: string) => this.props.modifyUser({
            category: 'userAddress',
            property: 'number',
            value: value,
            index: -1,
          })}
          value={this.props.user.userAddress?.number} />
        <FieldForm
          keyName="postal-box"
          label="BP: "
          type="text"
          handleChange={(value: string) => this.props.modifyUser({
            category: 'userAddress',
            property: 'box',
            value: value,
            index: -1,
          })}
          value={this.props.user.userAddress?.box} />
        <FieldForm
          keyName="postal-code"
          label="Code Postal: "
          type="text"
          handleChange={(value: string) => this.props.modifyUser({
            category: 'userAddress',
            property: 'zip-code',
            value: value,
            index: -1,
          })}
          value={this.props.user.userAddress?.zipCode} />
        <FieldForm
          keyName="city"
          label="Ville: "
          className="medium"
          type="text"
          handleChange={(value: string) => this.props.modifyUser({
            category: 'userAddress',
            property: 'city',
            value: value,
            index: -1,
          })}
          value={this.props.user.userAddress?.city} />
        <SelectFormField
          keyName="country"
          label="Pays: "
          options={['aaa', 'bbb']}
          handleChange={() => ({})}
          value="Aucun"
        />
        <FieldForm
          keyName="DOB"
          label="Date de naissance: "
          type="text"
          handleChange={(value: string) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'birthDate',
            value: value,
            index: indexWorking,
          })}
          value={userProfileWorking?.birthDate} />
        <SelectFormField
          keyName="search"
          label="Actuellement en recherche: "
          options={['Oui', 'Non']}
          handleChange={() => ({})}
          value="Aucun"
        />
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.userSelected.userSelected,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.userSelected.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormAddress);
