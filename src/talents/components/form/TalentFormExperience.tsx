import React from 'react';
import { User } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';

interface Props {
  talent: User,
}

interface State {
  value: string
}

export class TalentFormExperience extends React.Component<Props, State> {
  handleChange(value : any) {
    this.setState({ value : value });
    console.log(this.state.value, 'value of handlechange');
  }
  render() {
    let date = this.props.talent.userExperiences.map((elem) => elem.startDate);
    console.log( date, 'hebentoi');
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Expérience: </h6>
          <button className="form-add-button">Ajouter une expérience</button>
        </div>
        <FieldForm
          keyName="experience-company"
          label="Entreprise: "
          className="large"
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userExperiences.map((elem) => elem.company) }
        />
        <DateFormField
          keyName="experience-start"
          label="Début activité: "
          className="medium"
          value={ this.props.talent.userExperiences.map((elem) => elem.startDate.toString()) }
        />
        <DateFormField
          keyName="experience-end"
          label="Fin: "
          className="medium"
          value={ this.props.talent.userExperiences.map((elem) => elem.endDate.toString()) }
        />
        <FieldForm
          keyName="experience-position"
          label="Poste: "
          className="large"
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userExperiences.map((elem) => elem.position) }
        />
        <FieldForm
          keyName="experience-works"
          label="Tâches effectuées: "
          className="large"
          rows={ 5 }
          type='textarea'
          handleChange ={this.handleChange}
          value={ this.props.talent.userExperiences.map((elem) => elem.task) }
        />
      </div>
    );
  }
}

export default TalentFormExperience;
