import React from 'react';
import { Button, Col, Row, Container } from 'reactstrap';
import { User } from '../../../app';
import DateSlicer from '../../helpers/DateSlicer';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ModalTraining from '../modal/ModalTraining';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import InputFormField from '../../../app/components/utils/InputFormField';
import classes from '../styles/ModalTraining.module.css';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

interface State {
  isModalOpen: boolean,
}

export default class TalentFormTraining extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
    }
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Formations: </h6>
          <Button
            className="form-add-button"
            color="default"
            onClick={this.toggleModal}
          >
            Ajouter une formation
          </Button>
        </div>
        {
          this.props.user.userTrainings?.map((elem, index) => (
            <Container key={index} className="form-elements">
              <Row >
                <Col md={6}>
                  <InputFormField
                    id={"training-school" + index}
                    label="École: "
                    type="text"
                    className="form-label"
                    inputClassName={classes.InputModalTraining}
                    handleChange={(value) => this.props.modifyUser({
                      category: 'userTrainings',
                      property: 'institution',
                      value: value,
                      index: index,
                    })}
                    value={elem.institution} />
                </Col>
                <Col md={6}>
                  <InputFormField
                    id={"training-diploma" + index}
                    label="Diplôme obtenu: "
                    type="text"
                    className="form-label"
                    inputClassName={classes.InputModalTraining}
                    handleChange={(value) => this.props.modifyUser({
                      category: 'userTrainings',
                      property: 'degreeObtained',
                      value: value,
                      index: index,
                    })}
                    value={elem.degreeObtained} />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <InputFormField
                    id={"training-start" + index}
                    label="Début formation: "
                    type="date"
                    value={DateSlicer.getYearMonthDay(elem.startDate)}
                    className="form-label"
                    inputClassName={classes.InputModalTraining}
                    handleChange={(value: string) => this.props.modifyUser({
                      category: 'userTrainings',
                      property: 'startDate',
                      value: value,
                      index: index,
                    })}
                  />
                </Col>
                <Col md={6}>
                  <InputFormField
                    id={"training-end" + index}
                    label="Fin formation: "
                    type="date"
                    value={DateSlicer.getYearMonthDay(elem.endDate)}
                    className="form-label"
                    inputClassName={classes.InputModalTraining}
                    handleChange={(value: string) => this.props.modifyUser({
                      category: 'userTrainings',
                      property: 'endDate',
                      value: value,
                      index: index,
                    })}
                  />
                </Col>

              </Row>
            </Container>
          ))
        }
        <ModalCustom
          isModalShown={this.state.isModalOpen}
          toggleModal={this.toggleModal}
          titleModal="Ajouter une formation"
        >
          <ModalTraining />
        </ModalCustom>
      </div >
    );
  }
}
