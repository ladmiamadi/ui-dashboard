import fr from 'date-fns/locale/fr';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { User } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { UpdateUserPayload } from '../../state/models/userSelected';
import { Checkbox } from '../../../app/';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export default class TalentFormInternship extends React.Component<Props> {
  render() {
    const checkboxes: Checkbox[] = [
      { label: 'lundi', checked: this.props.user.userJob?.isWorkingOnMonday || false },
      { label: 'mardi', checked: this.props.user.userJob?.isWorkingOnTuesday || false } ,
      { label: 'mercredi', checked: this.props.user.userJob?.isWorkingOnWednesday || false },
      { label: 'jeudi', checked: this.props.user.userJob?.isWorkingOnThursday || false },
      { label: 'vendredi', checked: this.props.user.userJob?.isWorkingOnFriday || false },
      { label: 'samedi', checked: this.props.user.userJob?.isWorkingOnSaturday || false },
      { label: 'dimanche', checked: this.props.user.userJob?.isWorkingOnSunday || false },
    ];
    return (
      <div className="form-section">
        <div className="form-elements">
          <SelectFormField
            keyName="internship-status"
            label="Statut du stage: "
            options={['En Cours', 'Fin']}
            className="large"
            handleChange={() => ({})}
            value=""
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
          {/* <CheckboxFormField
            keyName="internship-days"
            label="Jour(s) d'activité: "
            className="large days"
            checkboxes={['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche']} 
          /> */}
          <CheckboxFormField
            checkboxes={checkboxes}
            className="large days"
            keyName="internship-days"
            label="Jour(s) d'activité: "
            handleOnChange={() => {}}
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
