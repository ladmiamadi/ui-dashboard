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

export class TalentFormExperience extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      user: props.user,
    };
  }

  handleChange(category: string, property : string, value: string) {
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
          <h6>Expérience: </h6>
          <button className="form-add-button">Ajouter une expérience</button>
        </div>
        {
          this.state.user.userExperiences.map((elem, index) => (
            <div className="form-elements" key={index}>
              <FieldForm
                keyName="experience-company"
                label="Entreprise: "
                className="large"
                type="text"
                handleChange={(value: string) =>
                  this.handleChange('userExperiences', 'company', value)}
                value={elem.company} />
              <DateFormField
                keyName="experience-start"
                label="Début activité: "
                className="medium"
                value={elem.startDate} />
              <DateFormField
                keyName="experience-end"
                label="Fin: "
                className="medium"
                value={elem.endDate} />
              <FieldForm
                keyName="experience-position"
                label="Poste: "
                className="large"
                type="text"
                handleChange={(value: string) => this.handleChange('userExperiences', 'position', value)}
                value={elem.position} />
              <FieldForm
                keyName="experience-works"
                label="Tâches effectuées: "
                className="large"
                rows={5}
                type="textarea"
                handleChange={(value: string) => this.handleChange('userExperiences', 'task', value)}
                value={elem.task} />
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

export default connect(mapState, mapDispatch)(TalentFormExperience);
