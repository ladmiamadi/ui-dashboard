import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { RootDispatch, RootState } from '../../../app/state/store';
import { TalentUserProfilesFilter } from '../../helpers/talentFilter';

interface Props {
  talent: User,
  modifyUser: (event: any) => void,
}

interface State {
  talent: User,
  userProfile: UserProfile,
}

export class TalentFormInternship extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      talent: this.props.talent,
      userProfile: TalentUserProfilesFilter.filterByEnvironment(props.talent.userProfiles, 'working'),
    };
  }

  handleChange( category: string, property : string, event: any) {
    const payload = {
      index: -1,
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
            <div className='form-elements' key={index}>
              <SelectFormField
                keyName="internship-status"
                label="Statut du stage: "
                options={['aaa', 'bbb']}
                className="large" />
              <DateFormField
                keyName="internship-start"
                label="Début: "
                value={elem.startDate} />
              <DateFormField
                keyName="internship-end"
                label="Fin: "
                value={elem.endDate} />
              <CheckboxFormField
                keyName="internship-days"
                label="Jour(s) d'activité: "
                className="large days"
                checkboxes={['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche']} />
              <FieldForm
                keyName="internship-hours"
                label="Horaire: "
                className="large"
                type='text'
                handleChange={(event) => this.handleChange('userJob','workingHours', event)}
                value={this.state.talent.userJob?.workingHours} />
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

export default connect(mapState, mapDispatch)(TalentFormInternship);
