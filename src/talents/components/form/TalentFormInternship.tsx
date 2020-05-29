import React from 'react';
import { User } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';

interface Props {
  talent: User,
}

interface State {
  value: string
}

export class TalentFormInternship extends React.Component<Props, State> {
  handleChange(value : any) {
    this.setState({ value : value });
  }
  render() {
    return (
      <div className="form-section">
        <SelectFormField
          keyName="internship-status"
          label="Statut du stage: "
          options={ ['aaa', 'bbb'] }
          className="large"
        />
        <DateFormField
          keyName="internship-start"
          label="Début: "
          value={ this.props.talent.userExperiences.map((elem) => elem.startDate.toString()) }
        />
        <DateFormField
          keyName="internship-end"
          label="Fin: "
          value={ this.props.talent.userExperiences.map((elem) => elem.startDate.toString()) }
        />
        <CheckboxFormField
          keyName="internship-days"
          label="Jour(s) d'activité: "
          className="large days"
          checkboxes={ ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'] }
        />
        <FieldForm
          keyName="internship-hours"
          label="Horaire: "
          className="large"
          type='text'
          handleChange ={this.handleChange}
        />
      </div>
    );
  }
}

export default TalentFormInternship;
