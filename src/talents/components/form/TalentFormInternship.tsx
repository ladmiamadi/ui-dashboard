import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { CheckboxFormField } from '../../../app/components/utils/CheckboxFormField';
import { RootDispatch, RootState } from '../../../app/state/store';
//import DateSlicer from '../../helpers/DateSlicer';
//import { FormatDate } from '../../index.d';
import { UpdateUserPayload } from '../../state/models/user';
import { Checkbox } from '../../../app/';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export class TalentFormInternship extends React.Component<Props> {
  render() {
    const checkboxes: Checkbox[] = [
      { label: 'lundi', checked: false },
      { label: 'mardi', checked: false } ,
      { label: 'mercredi', checked: false },
      { label: 'jeudi', checked: false },
      { label: 'vendredi', checked: false },
      { label: 'samedi', checked: false },
      { label: 'dimanche', checked: false },
    ];

    //let startDate = new Date();
    //let endDate = new Date();

    // if (this.props.user.userJob) {
    //   startDate = this.props.user.userJob.startDate;
    //   endDate = this.props.user.userJob.endDate;
    // }

    return (
      <div className="form-section">
        <div className="form-elements">
          <SelectFormField
            keyName="internship-status"
            label="Statut du stage: "
            options={['aaa', 'bbb']}
            className="large"
            handleOnChange={() => ({})}
            value="Aucun"
          />
          <DateFormField
            keyName="internship-start"
            label="Début: "
            values={{ day: 1, month: 1, year: 2000 }}
            yearSegment={{ yearStart: 2000, yearEnd: 2100 }}
            handleOnChange={() => {}}
          />
          <DateFormField
            keyName="internship-end"
            label="Fin: "
            values={{ day: 1, month: 1, year: 2000 }}
            yearSegment={{ yearStart: 2000, yearEnd: 2100 }}
            handleOnChange={() => {}}
          />
            <CheckboxFormField
          checkboxes={checkboxes}
          className="large days"
          keyName="internship-days"
          label="Jour(s) d'activité: "
          handleOnChange={() => {}}
        />
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
  user: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormInternship);
