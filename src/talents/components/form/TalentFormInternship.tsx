import React from 'react';
import fr from 'date-fns/locale/fr';
import ReactDatePicker from 'react-datepicker';
import { Col, FormGroup, Row } from 'reactstrap';
import { User } from '../../../app';
import { Checkbox } from '../../../app/';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { getInternshipRemainingDays, isUserInternshipFinishing } from '../../../app/helpers/UserHelpers';
import { getInternshipStatusClassname } from '../../constants/status-internship';
import { STATUS_OPTIONS } from '../../constants/status-options';
import { DAYS_TO_INTERSHIP_PROPERTIES } from '../../constants/week-days';
import { mapToOptionValues } from '../../helpers/FormHelper';
import { UpdateUserPayload } from '../../state/models/user-selected';
import './styles/TalentFormInternship.css';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

interface State {
  showInterviewOptions: boolean,
}

export default class TalentFormInternship extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      showInterviewOptions: false,
    };
  }

  toggleInterview = (): void => {
    this.setState({
      showInterviewOptions: !this.state.showInterviewOptions,
    });
  }

  render() {
    const isInternshipFinishing = isUserInternshipFinishing(getInternshipRemainingDays(this.props.user));
    const currentClassName = getInternshipStatusClassname(this.props.user.userJob?.status, isInternshipFinishing);
    const checkboxes: Checkbox[] = [
      { label: 'lundi', checked: this.props.user.userJob?.isWorkingOnMonday || false },
      { label: 'mardi', checked: this.props.user.userJob?.isWorkingOnTuesday || false },
      { label: 'mercredi', checked: this.props.user.userJob?.isWorkingOnWednesday || false },
      { label: 'jeudi', checked: this.props.user.userJob?.isWorkingOnThursday || false },
      { label: 'vendredi', checked: this.props.user.userJob?.isWorkingOnFriday || false },
      { label: 'samedi', checked: this.props.user.userJob?.isWorkingOnSaturday || false },
      { label: 'dimanche', checked: this.props.user.userJob?.isWorkingOnSunday || false },
    ];
    const checkboxInterview: Checkbox[] = [{ label: '', checked: false }];

    return (
      <div className="recruitment-section">
        <div className="form-title">
          <h6>Stage: </h6>
        </div>
        <div className={currentClassName}>
          <div className="form-elements">
            <Row>
              <Col md={6}>
                <SelectFormField
                  keyName="status"
                  label="Status du stage: "
                  options={mapToOptionValues(STATUS_OPTIONS)}
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
            <Row>
              <Col>
                <CheckboxFormField
                  checkboxes={checkboxInterview}
                  className="large days"
                  keyName="internship-days"
                  label="Voir les commentaires de l'entrevue:"
                  handleOnChange={this.toggleInterview}
                />
              </Col>
            </Row>
            {this.state.showInterviewOptions && (
              <div className="generic-field-form">
                <Row>
                  <Col md={12}>
                    <FieldForm
                      keyName="startInterview"
                      label="Entretien de début de stage: "
                      className="generic-field-form"
                      type="textarea"
                      handleChange={(value) => this.props.modifyUser({
                        category: 'userJob',
                        property: 'startInterview',
                        value,
                        index: -1,
                      })}
                      value={this.props.user.userJob?.startInterview || ''}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FieldForm
                      keyName="middleInterview"
                      label="Entretien de milieu de stage: "
                      className="generic-field-form"
                      type="textarea"
                      handleChange={(value) => this.props.modifyUser({
                        category: 'userJob',
                        property: 'middleInterview',
                        value,
                        index: -1,
                      })}
                      value={this.props.user.userJob?.middleInterview || ''}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FieldForm
                      keyName="endInterview"
                      label="Entretien de fin de stage: "
                      className="generic-field-form"
                      type="textarea"
                      handleChange={(value) => this.props.modifyUser({
                        category: 'userJob',
                        property: 'endInterview',
                        value,
                        index: -1,
                      })}
                      value={this.props.user.userJob?.endInterview || ''}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
