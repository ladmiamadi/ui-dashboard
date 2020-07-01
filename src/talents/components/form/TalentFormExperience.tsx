import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import DateSlicer from '../../helpers/DateSlicer';
import { FormatDate } from '../../index.d';
import { UpdateUserPayload } from '../../state/models/userSelected';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export class TalentFormExperience extends React.Component<Props> {
  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Expérience: </h6>
          <button className="form-add-button">Ajouter une expérience</button>
        </div>
        {
          this.props.user.userExperiences?.map((elem, index) => (
            <div className="form-elements" key={index}>
              <FieldForm
                keyName="experience-company"
                label="Entreprise: "
                className="large"
                type="text"
                handleChange={(value: string) => this.props.modifyUser({
                  category: 'userExperiences',
                  property: 'company',
                  value: value,
                  index: index,
                })}
                value={elem.company}
              />
              <DateFormField
                keyName="experience-start"
                label="Début activité: "
                className="medium"
                day={DateSlicer.formatDate(elem.startDate.toString(), FormatDate.DAY)}
                month={DateSlicer.formatDate(elem.startDate.toString(), FormatDate.MONTH)}
                year={DateSlicer.formatDate(elem.startDate.toString(), FormatDate.YEAR)}
              />
              <DateFormField
                keyName="experience-end"
                label="Fin: "
                className="medium"
                day={DateSlicer.formatDate(elem.endDate.toString(), FormatDate.DAY)}
                month={DateSlicer.formatDate(elem.endDate.toString(), FormatDate.MONTH)}
                year={DateSlicer.formatDate(elem.endDate.toString(), FormatDate.YEAR)} />
              <FieldForm
                keyName="experience-position"
                label="Poste: "
                className="large"
                type="text"
                handleChange={(value: string) => this.props.modifyUser({
                  category: 'userExperiences',
                  property: 'position',
                  value: value,
                  index: index,
                })}
                value={elem.position} />
              <FieldForm
                keyName="experience-works"
                label="Tâches effectuées: "
                className="large"
                rows={5}
                type="textarea"
                handleChange={(value: string) => this.props.modifyUser({
                  category: 'userExperiences',
                  property: 'task',
                  value: value,
                  index: index,
                })}
                value={elem.task} />
            </div>
          ))
        }
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

export default connect(mapState, mapDispatch)(TalentFormExperience);
