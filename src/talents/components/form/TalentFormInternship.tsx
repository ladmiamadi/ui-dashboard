import React from 'react';
import { Checkbox } from '../../../app/';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { Col, Row } from 'reactstrap';
import { DatePickerFieldForm } from '../../../app/components/utils/DatePickerFieldForm';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { STATUSOPTIONS } from '../../constants/status-options';
import { UpdateUserPayload } from '../../state/models/user-selected';
import { User } from '../../../app';
import fr from 'date-fns/locale/fr';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

enum WEEK_DAYS {
  LUNDI = 'lundi',
  MARDI = 'mardi',
  MERCREDI = 'mercredi',
  JEUDI = 'jeudi',
  VENDREDI = 'vendredi',
  SAMEDI = 'samedi',
  DIMANCHE = 'dimanche',
}

export const DAYS_TO_INTERSHIP_PROPERTIES = {
  [WEEK_DAYS.LUNDI]: 'isWorkingOnMonday',
  [WEEK_DAYS.MARDI]: 'isWorkingOnTuesday',
  [WEEK_DAYS.MERCREDI]: 'isWorkingOnWednesday',
  [WEEK_DAYS.JEUDI]: 'isWorkingOnThursday',
  [WEEK_DAYS.VENDREDI]: 'isWorkingOnFriday',
  [WEEK_DAYS.SAMEDI]: 'isWorkingOnSaturday',
  [WEEK_DAYS.DIMANCHE]: 'isWorkingOnSunday',
};

export default class TalentFormInternship extends React.Component<Props> {

  render() {
    const checkboxes: Checkbox[] = [
      { label: WEEK_DAYS.LUNDI, checked: this.props.user.userJob?.isWorkingOnMonday || false },
      { label: WEEK_DAYS.MARDI, checked: this.props.user.userJob?.isWorkingOnTuesday || false },
      { label: WEEK_DAYS.MERCREDI, checked: this.props.user.userJob?.isWorkingOnWednesday || false },
      { label: WEEK_DAYS.JEUDI, checked: this.props.user.userJob?.isWorkingOnThursday || false },
      { label: WEEK_DAYS.VENDREDI, checked: this.props.user.userJob?.isWorkingOnFriday || false },
      { label: WEEK_DAYS.SAMEDI, checked: this.props.user.userJob?.isWorkingOnSaturday || false },
      { label: WEEK_DAYS.DIMANCHE, checked: this.props.user.userJob?.isWorkingOnSunday || false },
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
                  property: DAYS_TO_INTERSHIP_PROPERTIES[label as WEEK_DAYS],
                  value,
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
