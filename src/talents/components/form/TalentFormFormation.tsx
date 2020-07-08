import React from 'react';
import { Button } from 'reactstrap';
import { User } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import DateSlicer from '../../helpers/DateSlicer';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ModalTraining from '../modal/ModalTraining';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import InputFormField from '../../../app/components/utils/InputFormField';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

interface State {
  isModalOpen: boolean,
}

export default class TalentFormFormation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
    }
  }

  toggleModalAndResetModalOnQuit = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Formations: </h6>
          <Button
            className="form-add-button"
            onClick={this.toggleModalAndResetModalOnQuit}
          >
            Ajouter une formation
          </Button>
        </div>
        {
          this.props.user.userTrainings?.map((elem, index) => (
            <div className="form-elements" key={index}>
              <FieldForm
                keyName={"formation-school" + index}
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
              {/* <DateFormField
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
                year={DateSlicer.formatDate(elem.endDate.toString(), FormatDate.YEAR)} /> */}
              <InputFormField
                id={"formation-start" + index}
                label="Début formation: "
                type="date"
                value={DateSlicer.getYearMonthDay(elem.startDate)}
                handleChange={(value: string) => this.props.modifyUser({
                  category: 'userTrainings',
                  property: 'startDate',
                  value: value,
                  index: index,
                })}
              />
              <InputFormField
                id={"formation-end" + index}
                label="Fin formation: "
                type="date"
                value={DateSlicer.getYearMonthDay(elem.endDate)}
                handleChange={(value: string) => this.props.modifyUser({
                  category: 'userTrainings',
                  property: 'endDate',
                  value: value,
                  index: index,
                })}
              />
              <FieldForm
                keyName={"formation-diploma" + index}
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
        <ModalCustom
          isModalShown={this.state.isModalOpen}
          toggleModal={this.toggleModalAndResetModalOnQuit}
          titleModal="Ajouter une formation"
        >
          <ModalTraining />
        </ModalCustom>
      </div>
    );
  }
}
