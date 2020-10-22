import fr from 'date-fns/locale/fr';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Col, Row } from 'reactstrap';
import { User, UserProfile } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ProfileCollection from '../../helpers/ProfileCollection';
import { COUNTRIES } from '../../constants/countries';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

// interface State {
//   unselectedCountries: string[],
// }

export default class TalentFormAddress extends React.Component<Props> {
  render() {
    const indexWorking: number = ProfileCollection.findWorkingIndex(this.props.user.userProfiles);
    const userProfileWorking: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles,
      'working',
    );

    return (
      <div className="address-section">
        <Row>
          <Col md={6}>
            <FieldForm
              keyName="street"
              label="Rue: "
              className="address-field-form"
              type="text"
              handleChange={(value: string) => this.props.modifyUser({
                category: 'userAddress',
                property: 'street',
                value: value,
                index: -1,
              })}
              value={this.props.user.userAddress?.street} />
          </Col>
          <Col md={6}>
            <FieldForm
              keyName="number"
              label="Num: "
              type="text"
              className="address-field-form"
              handleChange={(value: string) => this.props.modifyUser({
                category: 'userAddress',
                property: 'number',
                value: value,
                index: -1,
              })}
              value={this.props.user.userAddress?.number} />
          </Col>
          <Col md={6}>
            <FieldForm
              keyName="postal-box"
              label="BP: "
              type="text"
              className="address-field-form"
              handleChange={(value: string) => this.props.modifyUser({
                category: 'userAddress',
                property: 'box',
                value: value,
                index: -1,
              })}
              value={this.props.user.userAddress?.box} />
          </Col>
          <Col md={6}>
            <FieldForm
              keyName="postal-code"
              label="Code Postal: "
              type="number"
              className="address-field-form"
              handleChange={(value: string) => this.props.modifyUser({
                category: 'userAddress',
                property: 'zipCode',
                value: +value,
                index: -1,
              })}
              value={this.props.user.userAddress?.zipCode} />
          </Col>
          <Col md={6}>
            <FieldForm
              keyName="city"
              label="Ville: "
              className="address-field-form"
              type="text"
              handleChange={(value: string) => this.props.modifyUser({
                category: 'userAddress',
                property: 'city',
                value: value,
                index: -1,
              })}
              value={this.props.user.userAddress?.city} />
          </Col>
          <Col md={6}>
            <SelectFormField
              keyName="country"
              className="address-field-form"
              label="Pays: "
              options={COUNTRIES}
              handleChange={() => ({})}
              value="Aucun"
            />
          </Col>
          <Col md={6}>
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
          </Col>
          <Col md={6}>
            <SelectFormField
              keyName="search"
              className="address-field-form"
              label="Actuellement en recherche: "
              options={['Oui', 'Non']}
              handleChange={() => ({})}
              value="Aucun"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
