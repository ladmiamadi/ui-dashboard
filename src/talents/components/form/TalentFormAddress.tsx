import React from 'react';
import { Col, Row } from 'reactstrap';
import { COUNTRIES } from '../../constants/countries';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { UpdateUserPayload } from '../../state/models/user-selected';
import { User } from '../../../app';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export default class TalentFormAddress extends React.Component<Props> {
  render() {

    return (
      <div className="address-section">
        <div className="form-title">
          <h6>Adresse: </h6>
        </div>
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
                value,
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
                value,
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
                value,
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
                value,
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
              handleChange={(property, value) => this.props.modifyUser({
                category: 'userAddress',
                property,
                value,
                index: -1,
              })}
              value={this.props.user.userAddress?.country || ''}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
