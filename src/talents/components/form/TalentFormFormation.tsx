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
        />
        <DateFormField
          keyName="formation-start"
          label="Début formation: "
          className="medium"
        />
        <DateFormField
          keyName="formation-end"
          label="Fin: "
          className="medium"
        />
        <FieldForm
          keyName="formation-diploma"
          label="Diplôme obtenu: "
          className="large"
          type='text'
          handleChange ={this.handleChange}
        />
      </div>
    );
  }
}

export default TalentFormFormation;
