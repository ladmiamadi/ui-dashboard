import fr from 'date-fns/locale/fr';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { User } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { UpdateUserPayload } from '../../state/models/userSelected';
import { Checkbox } from '../../../app/';
//import { property } from 'lodash';

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
      // break;
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
          <SelectFormField
            keyName="status"
            label="Statut du stage: "
            options={['Non initié', 'En Cours', 'Avorté', 'Fin']}
            className="large"
            handleChange={(property, value) => this.props.modifyUser({
              category: 'userJob',
              property,
              value,
              index: -1,
            })}
            value={this.props.user.userJob?.status || ''}
          />
          <label className="label-internship">Début:  </label>
          <ReactDatePicker
            className="intern-datepicker"
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
              value: value,
              index: -1,
            })}
          />
          <label className="label-internship">Fin:  </label>
          <ReactDatePicker
            className="intern-datepicker"
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
              value: value,
              index: -1,
            })}
          />          
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
        </div>
      </div>
    );
  }
}
