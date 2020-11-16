import fr from 'date-fns/locale/fr';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { User } from '../../../app';
import { Checkbox } from '../../../app/';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { DatePickerFieldForm } from '../../../app/components/utils/DatePickerFieldForm';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { STATUS_OPTIONS } from '../../constants/status-options';
import { DAYS_TO_INTERSHIP_PROPERTIES } from '../../constants/week-days';
import { UpdateUserPayload } from '../../state/models/user-selected';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export default class TalentFormInternship extends React.Component<Props> {
  render() {
    const checkboxes: Checkbox[] = [
      { label: 'lundi', checked: this.props.user.userJob?.isWorkingOnMonday || false },
      { label: 'mardi', checked: this.props.user.userJob?.isWorkingOnTuesday || false },
      { label: 'mercredi', checked: this.props.user.userJob?.isWorkingOnWednesday || false },
      { label: 'jeudi', checked: this.props.user.userJob?.isWorkingOnThursday || false },
      { label: 'vendredi', checked: this.props.user.userJob?.isWorkingOnFriday || false },
      { label: 'samedi', checked: this.props.user.userJob?.isWorkingOnSaturday || false },
      { label: 'dimanche', checked: this.props.user.userJob?.isWorkingOnSunday || false },
    ];

    return (
      <div className="form-section">
        <div className="form-title">
          <h6>Stage: </h6>
        </div>
        <div className="form-elements">
          <Row>
            <Col md={6}>
              <SelectFormField
                keyName="status"
                label="Status du stage: "
                options={STATUS_OPTIONS}
                className="large"
                handleChange={(property, value) => this.props.modifyUser({
                  category: 'userJob',
                  property,
                  value,
                  index: -1,
                })}
                value={this.props.user.userJob?.status || ''}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <DatePickerFieldForm
                keyName="intern-datepicker form-control"
                label="Début: "
                value={this.props.user.userJob?.startDate}
                locale={fr}
                handleChange={(value) => this.props.modifyUser({
                  category: 'userJob',
                  property: 'startDate',
                  value,
                  index: -1,
                })}
              />
            </Col>
            <Col md={6}>
              <DatePickerFieldForm
                keyName="endDate"
                label="Fin: "
                value={this.props.user.userJob?.endDate}
                locale={fr}
                handleChange={(value) => this.props.modifyUser({
                  category: 'userJob',
                  property: 'endDate',
                  value,
                  index: -1,
                })}
              />
            </Col>
          </Row>
          <Row>
            <CheckboxFormField
              checkboxes={checkboxes}
              className="large days"
              keyName="internship-days"
              label="Jour(s) d'activité: "
              handleOnChange={(label, value) => this.props.modifyUser({
                category: 'userJob',
                property: DAYS_TO_INTERSHIP_PROPERTIES[label],
                value,
                index: -1,
              })}
            />
          </Row>
          <Row>
            <Col md={6}>
              <FieldForm
                keyName="internship-hours"
                label="Horaire: "
                className="large"
                type="text"
                handleChange={(value) => this.props.modifyUser({
                  category: 'userJob',
                  property: 'workingHours',
                  value,
                  index: -1,
                })}
                value={this.props.user.userJob?.workingHours} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
