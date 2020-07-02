import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { RootDispatch, RootState } from '../../../app/state/store';
import DateSlicer from '../../helpers/DateSlicer';
import { FormatDate } from '../../index.d';
import { UpdateUserPayload } from '../../state/models/userSelected';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export class TalentFormInternship extends React.Component<Props> {
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
            className="large"
            handleChange={() => ({})}
            value="" />
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
            handleChange={(value) => this.props.modifyUser({
              category: 'userJob',
              property: 'workingHours',
              value: value,
              index: -1,
            })}
            value={this.props.user.userJob?.workingHours} />
        </div>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.userSelected.userSelected,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.userSelected.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormInternship);
