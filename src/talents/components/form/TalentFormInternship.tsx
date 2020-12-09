import fr from 'date-fns/locale/fr';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Col, FormGroup, Row } from 'reactstrap';
import { Checkbox, INTERNSHIP_STATUS, User } from '../../../app/index.d';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { STATUS_OPTIONS } from '../../constants/status-options';
import { DAYS_TO_INTERSHIP_PROPERTIES } from '../../constants/week-days';
import { UpdateUserPayload } from '../../state/models/user-selected';
import classes from './styles/TalentFormInternship.module.css';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

const STATUS_INTERNSHIP_CLASS_NAMES: { [status in INTERNSHIP_STATUS]: string } = {
  [INTERNSHIP_STATUS.NON_STARTED]: 'notStarted-internship',
  [INTERNSHIP_STATUS.ONGOING]: 'ongoing-internship',
  [INTERNSHIP_STATUS.ABANDONED]: 'abandoned-internship',
  [INTERNSHIP_STATUS.FINISHED]: 'finished-internship',
  [INTERNSHIP_STATUS.NONE]: 'none',
};

export default class TalentFormInternship extends React.Component<Props> {
  render() {
    const statusInternship = this.props.user.userJob?.status || INTERNSHIP_STATUS.NONE;

    const currentClassName = STATUS_INTERNSHIP_CLASS_NAMES[statusInternship];

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
      <div className={classes[currentClassName]}>
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
                  className="generic-field-form"
                  handleChange={(property, value) => this.props.modifyUser({
                    category: 'userJob',
                    property,
                    value,
                    index: -1,
                  })}
                  value={this.props.user.userJob?.status || ''}
                  required={true}
                />
              </Col>
              <Col md={6}>
                <FieldForm
                  keyName="internship-hours"
                  label="Horaire: "
                  className="generic-field-form"
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
            <Row>
              <Col md={6}>
                <FormGroup className="generic-field-form">
                  <label className="form-label">Debut: </label>
                  <ReactDatePicker
                    className={'datepicker form-input form-control'}
                    selected={this.props.user.userJob?.startDate}
                    isClearable
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    locale={fr}
                    onChange={(value) => this.props.modifyUser({
                      category: 'userJob',
                      property: 'startDate',
                      value,
                      index: -1,
                    })}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className="generic-field-form">
                  <label className="form-label">Fin: </label>
                  <ReactDatePicker
                    className={'datepicker form-input form-control'}
                    selected={this.props.user.userJob?.endDate}
                    isClearable
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    locale={fr}
                    onChange={(value) => this.props.modifyUser({
                      category: 'userJob',
                      property: 'endDate',
                      value,
                      index: -1,
                    })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
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
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
