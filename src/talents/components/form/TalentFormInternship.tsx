import fr from 'date-fns/locale/fr';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { User } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { UpdateUserPayload } from '../../state/models/userSelected';
import { Checkbox } from '../../../app/';
import { STATUSOPTIONS } from '../../constants/StatusOptions';
import { DatePickerFieldForm } from '../../../app/components/utils/DatePickerFieldForm';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export default class TalentFormInternship extends React.Component<Props> {

  mapLabelToProperty(label: string) {
    let property;

    switch (label) {
    case 'lundi':
      property = 'isWorkingOnMonday';
      break;
    case 'mardi':
      property = 'isWorkingOnTuesday';
      break;
    case 'mercredi':
      property = 'isWorkingOnWednesday';
      break;
    case 'jeudi':
      property = 'isWorkingOnThursday';
      break;
    case 'vendredi':
      property = 'isWorkingOnFriday';
      break;
    case 'samedi':
      property = 'isWorkingOnSaturday';
      break;
    case 'dimanche':
      property = 'isWorkingOnSunday';
      break;
    default:
      throw new Error(`Unknown value for label: '${label}'`);
    }

    return property;
  }

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
            <Col md={4}>
              <SelectFormField
                keyName="status"
                label="Status du stage: "
                options={STATUSOPTIONS}
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
            <Col md={4}>
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
            <Col md={4}>
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
            <Col md={12}>
              <CheckboxFormField
                checkboxes={checkboxes}
                className="large days"
                keyName="internship-days"
                label="Jour(s) d'activité: "
                handleOnChange={(label, value) => this.props.modifyUser({
                  category: 'userJob',
                  property: this.mapLabelToProperty(label),
                  value: value,
                  index: -1,
                })}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FieldForm
                keyName="internship-hours"
                label="Horaire: "
                className="large"
                type="text"
                handleChange={(value) => this.props.modifyUser({
                  category: 'userJob',
                  property: 'workingHours',
                  value: value,
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
