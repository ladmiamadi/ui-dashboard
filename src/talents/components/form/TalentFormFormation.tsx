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

export class TalentFormFormation extends React.Component<Props> {
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
              <DateFormField
                className="medium"
                keyName="formation-start"
                label="Début formation: "
                values={{ day: 1, month: 1, year: 2000 }}
                yearSegment={{ yearStart: 2000, yearEnd: 2100 }}
                handleOnChange={() => {}}
              />
              <DateFormField
                className="medium"
                keyName="formation-end"
                label="Fin: "
                values={{ day: 1, month: 1, year: 2000 }}
                yearSegment={{ yearStart: 2000, yearEnd: 2100 }}
                handleOnChange={() => {}}
              />
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

const mapState = (state: RootState) => ({
  user: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormFormation);
