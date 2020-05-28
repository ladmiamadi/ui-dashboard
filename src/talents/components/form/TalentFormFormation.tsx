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

export class TalentFormFormation extends React.Component<Props, State> {
  handleChange(value : any) {
    this.setState({ value : value });
    console.log(this.state.value, 'value of handlechange');
  }

  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Formations: </h6>
          <button className="form-add-button">Ajouter une formation</button>
        </div>
        <FieldForm
          keyName="formation-school"
          label="École: "
          className="large"
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userTrainings.map((elem) => elem.institution) }
        />
        <DateFormField
          keyName="formation-start"
          label="Début formation: "
          className="medium"
          value={ this.props.talent.userExperiences.map((elem) => elem.startDate.toString()) }
        />
        <DateFormField
          keyName="formation-end"
          label="Fin: "
          className="medium"
          value={ this.props.talent.userExperiences.map((elem) => elem.endDate.toString()) }
        />
        <FieldForm
          keyName="formation-diploma"
          label="Diplôme obtenu: "
          className="large"
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userTrainings.map((elem) => elem.degreeObtained) }
        />
      </div>
    );
  }
}

export default TalentFormFormation;
