import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { RootDispatch, RootState } from '../../../app/state/store';

interface Props {
  talent: User,
  modifyUser: (event: any) => void,
}

interface State {
  talent: User,
}

export class TalentFormInternship extends React.Component<Props, State> {
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
        {
          this.state.talent.userExperiences.map((elem, index) => (
            <div key={ index }>
              <SelectFormField
                keyName="internship-status"
                label="Statut du stage: "
                options={ ['aaa', 'bbb'] }
                className="large"
              />
              <DateFormField
                keyName="internship-start"
                label="Début: "
                value={ elem.startDate }
              />
              <DateFormField
                keyName="internship-end"
                label="Fin: "
                value={ elem.endDate }
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
                handleChange ={ (event) => this.handleChange('userProfiles','internship-hours', event) }
                /*      value={ this.state.talent }*/
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

export default connect(mapState, mapDispatch)(TalentFormInternship);
