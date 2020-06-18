import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UpdateUserPayload } from '../../state/models/user';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

interface State {
  user: User,
}

export class TalentFormFormation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      user: props.user,
    };
  }

  handleChange(category: string, property: string, value: string) {
    const payload = {
      index: 0,
      category: category,
      property: property,
      value: value,
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
          this.state.user.userTrainings.map((elem, index) => (
            <div className="form-elements" key={index}>
              <FieldForm
                keyName="formation-school"
                label="École: "
                className="large"
                type="text"
                handleChange={(value) => this.handleChange('userTrainings', 'institution', value)}
                value={elem.institution} />
              <DateFormField
                keyName="formation-start"
                label="Début formation: "
                className="medium"
                value={elem.startDate} />
              <DateFormField
                keyName="formation-end"
                label="Fin: "
                className="medium"
                value={elem.endDate} />
              <FieldForm
                keyName="formation-diploma"
                label="Diplôme obtenu: "
                className="large"
                type="text"
                handleChange={(value) => this.handleChange('userTrainings', 'degreeObtained', value)}
                value={elem.degreeObtained} />
            </div>
          ))
        }
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormFormation);
