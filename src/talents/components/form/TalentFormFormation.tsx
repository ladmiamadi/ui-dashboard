import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';

interface Props {
  talent: User,
  modifyUser: (event: any) => void,
}

interface State {
  talent: User,
}

export class TalentFormFormation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      talent: this.props.talent,
    };
  }

  handleChange(category: string, property : string, event: any) {
    const payload = {
      category: category,
      property : property,
      value : event,
    };

    this.props.modifyUser(payload);
  }

  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Formations: </h6>
          <button className="form-add-button">Ajouter une formation</button>
        </div>
        {
          this.state.talent.userTrainings.map((elem, index) => (
            <div key={ index }>
              <FieldForm
                keyName="formation-school"
                label="École: "
                className="large"
                type='text'
                handleChange ={ (event) => this.handleChange('userTraining','formation-school', event) }
                value={ elem.institution }
              />
              <DateFormField
                keyName="formation-start"
                label="Début formation: "
                className="medium"
                value={ elem.startDate }
              />
              <DateFormField
                keyName="formation-end"
                label="Fin: "
                className="medium"
                value={ elem.endDate }
              />
              <FieldForm
                keyName="formation-diploma"
                label="Diplôme obtenu: "
                className="large"
                type='text'
                handleChange ={ (event) => this.handleChange('userTraining','formation-diploma', event) }
                value={  elem.degreeObtained }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  talent: state.user.user
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormFormation);
