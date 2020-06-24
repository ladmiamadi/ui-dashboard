import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { RootDispatch, RootState } from '../../../app/state/store';
import DateSlicer from '../../helpers/DateSlicer';
import { TalentUserProfilesFilter } from '../../helpers/talentFilter';
import { FormatDate } from '../../index.d';
import { UpdateUserPayload } from '../../state/models/user';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

interface State {
  user: User,
  userProfile?: UserProfile,
}

export class TalentFormInternship extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      user: props.user,
      userProfile: TalentUserProfilesFilter.filterByEnvironment(props.user.userProfiles, 'working'),
    };
  }

  handleChange(category: string, property : string, value: string) {
    const payload = {
      index: -1,
      category: category,
      property: property,
      value: value,
    };

    this.props.modifyUser(payload);
  }

  render() {
    let startDate = new Date();
    let endDate = new Date();

    if (this.props.user.userJob) {
      startDate = this.props.user.userJob.startDate;
      endDate = this.props.user.userJob.endDate;
    }

    return (
      <div className="form-section">
        <div className="form-elements">
          <SelectFormField
            keyName="internship-status"
            label="Statut du stage: "
            options={['aaa', 'bbb']}
            className="large" />
          <DateFormField
            keyName="internship-start"
            label="Début: "
            day={DateSlicer.formatDate(startDate.toString(), FormatDate.DAY)}
            month={DateSlicer.formatDate(startDate.toString(), FormatDate.MONTH)}
            year={DateSlicer.formatDate(startDate.toString(), FormatDate.YEAR)} />
          <DateFormField
            keyName="internship-end"
            label="Fin: "
            day={DateSlicer.formatDate(endDate.toString(), FormatDate.DAY)}
            month={DateSlicer.formatDate(endDate.toString(), FormatDate.MONTH)}
            year={DateSlicer.formatDate(endDate.toString(), FormatDate.YEAR)} />
          <CheckboxFormField
            keyName="internship-days"
            label="Jour(s) d'activité: "
            className="large days"
            checkboxes={['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche']} />
          <FieldForm
            keyName="internship-hours"
            label="Horaire: "
            className="large"
            type="text"
            handleChange={(value) => this.handleChange('userJob', 'workingHours', value)}
            value={this.state.user.userJob?.workingHours} />
        </div>
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

export default connect(mapState, mapDispatch)(TalentFormInternship);
