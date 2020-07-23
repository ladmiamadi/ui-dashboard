import fr from 'date-fns/locale/fr';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { User, UserProfile } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ProfileCollection from '../../helpers/ProfileCollection';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export default class TalentFormAddress extends React.Component<Props> {
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
          type="number"
          handleChange={(value: string) => this.props.modifyUser({
            category: 'userAddress',
            property: 'zipCode',
            value: +value,
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
        <label className="label-birthdate">Date de naissance:  </label>
        <ReactDatePicker
          className="address-datepicker"
          selected={userProfileWorking?.birthDate}
          isClearable
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          locale={fr}
          onChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'birthDate',
            value: value,
            index: indexWorking,
          })}
        />
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
