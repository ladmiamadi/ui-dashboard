import React from 'react';
import { User } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import DateSlicer from '../../helpers/DateSlicer';
import { FormatDate } from '../../index.d';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ReactDatePicker from 'react-datepicker';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export default class TalentFormFormation extends React.Component<Props> {
  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Formations: </h6>
          <button className="form-add-button">Ajouter une formation</button>
        </div>
        {
          this.props.user.userTrainings?.map((elem, index) => (
            <div className="form-elements" key={index}>
              <FieldForm
                keyName="formation-school"
                label="École: "
                className="large"
                type="text"
                handleChange={(value) => this.props.modifyUser({
                  category: 'userTrainings',
                  property: 'institution',
                  value: value,
                  index: index,
                })}
                value={elem.institution} />
              <ReactDatePicker
                selected={elem.startDate}
                onChange={(value) => this.props.modifyUser({
                  category: 'userTrainings',
                  property: 'startDate',
                  value: value,
                  index: index,
                })}
              />
              <DateFormField
                keyName="formation-start"
                label="Début formation: "
                className="medium"
                day={DateSlicer.formatDate(elem.startDate.toString(), FormatDate.DAY)}
                month={DateSlicer.formatDate(elem.startDate.toString(), FormatDate.MONTH)}
                year={DateSlicer.formatDate(elem.startDate.toString(), FormatDate.YEAR)} />
              <DateFormField
                keyName="formation-end"
                label="Fin: "
                className="medium"
                day={DateSlicer.formatDate(elem.endDate.toString(), FormatDate.DAY)}
                month={DateSlicer.formatDate(elem.endDate.toString(), FormatDate.MONTH)}
                year={DateSlicer.formatDate(elem.endDate.toString(), FormatDate.YEAR)} />
              <FieldForm
                keyName="formation-diploma"
                label="Diplôme obtenu: "
                className="large"
                type="text"
                handleChange={(value) => this.props.modifyUser({
                  category: 'userTrainings',
                  property: 'degreeObtained',
                  value: value,
                  index: index,
                })}
                value={elem.degreeObtained} />
            </div>
          ))
        }
      </div>
    );
  }
}
