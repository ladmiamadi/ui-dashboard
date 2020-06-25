import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import DateSlicer from '../../helpers/DateSlicer';
import { FormatDate } from '../../index.d';
import { UpdateUserPayload } from '../../state/models/user';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

interface Payload {
  index: number,
  category: string,
  property: string,
  value: string,
}

export class TalentFormFormation extends React.Component<Props> {
  handleChange(payload: Payload) {
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
          this.props.user.userTrainings?.map((elem, index) => (
            <div className="form-elements" key={index}>
              <FieldForm
                keyName="formation-school"
                label="École: "
                className="large"
                type="text"
                handleChange={(value) => this.handleChange({
                  category: 'userTrainings',
                  property: 'institution',
                  value: value,
                  index: index,
                })}
                value={elem.institution} />
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
                handleChange={(value) => this.handleChange({
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

const mapState = (state: RootState) => ({
  user: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormFormation);
