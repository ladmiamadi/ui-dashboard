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

export class TalentFormExperience extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      talent: this.props.talent,
    };
  }

  handleChange(category: string, property : string, event: any) {
    const payload = {
      index: 0,
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
          <h6>Expérience: </h6>
          <button className="form-add-button">Ajouter une expérience</button>
        </div>
        {
          this.state.talent.userExperiences.map((elem, index) => (
            <div className="form-elements" key={index}>
              <FieldForm
                keyName="experience-company"
                label="Entreprise: "
                className="large"
                type="text"
                handleChange={(event: MouseEvent) =>
                  this.handleChange('userExperiences', 'company', event)}
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
                type='text'
                handleChange={(event: MouseEvent) => this.handleChange('userExperiences', 'position', event)}
                value={elem.position} />
              <FieldForm
                keyName="experience-works"
                label="Tâches effectuées: "
                className="large"
                rows={5}
                type='textarea'
                handleChange={(event: MouseEvent) => this.handleChange('userExperiences', 'task', event)}
                value={elem.task} />
            </div>
          ))
        }
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  talent: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormExperience);
