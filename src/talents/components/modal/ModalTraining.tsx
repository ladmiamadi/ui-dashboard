import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Col, Row } from 'reactstrap';
import { UserTraining, Training } from '../../../app';
import { UserTrainingFactory } from '../../helpers/UserTrainingFactory';
import { RootDispatch } from '../../../app/state/store';
import InputFormField from '../../../app/components/utils/InputFormField';
import lodash from 'lodash';
import classes from '../styles/ModalTraining.module.css';

interface Props {
  addUserTraining: (payload: UserTraining) => void,
}

interface State {
  isFormValid: IsFormValid,
  training: UserTraining,
}

export type IsFormValid = Training<boolean, number>;

export class ModalTraining extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFormValid: UserTrainingFactory.createEmptyFormValid(),
      training: UserTrainingFactory.createEmptyUserTraining(),
    };
  }

  updateIsFormValid = (property: keyof IsFormValid, value: string, regexp: RegExp) => {
    const copyOfIsFormValid = { ...this.state.isFormValid };

    if (property !== 'id') {
      copyOfIsFormValid[property] = regexp.test(value);
    }

    this.setState((prevState) => ({ ...prevState, isFormValid: copyOfIsFormValid }))
  }

  updateTraining = (property: keyof UserTraining, value: string) => {
    const copyOfUserTrainingState = { ...this.state.training };

    if (property !== 'id') {
      copyOfUserTrainingState[property] = value;
    }

    this.setState((prevState) => ({ ...prevState, training: copyOfUserTrainingState }))
  }

  activeButton = (): boolean => {
    let key: keyof IsFormValid;
    let isButtonActived = true;

    for (key in this.state.isFormValid) {
      if (key !== 'id') {
        isButtonActived = isButtonActived && this.state.isFormValid[key]
      }
    }

    return isButtonActived;
  }

  resetState = () => {
    this.setState({
      isFormValid: UserTrainingFactory.createEmptyFormValid(),
      training: UserTrainingFactory.createEmptyUserTraining(),
    })
  }

  handleChange = <T, U>(property: keyof Training<T, U>, value: string, regexp: RegExp) => {
    this.updateIsFormValid(property, value, regexp);

    this.updateTraining(property, value);

  }

  handleClick = () => {
    this.props.addUserTraining(lodash.cloneDeep(this.state.training));

    this.resetState();
  }

  render() {
    const yearMonthDayRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i;

    return (
      <>
        <Container>
          <Row >
            <Col md={6}>
              <InputFormField
                id="training-school"
                label="École: "
                type="text"
                className="form-label"
                inputClassName={classes.InputModalTraining}
                value={this.state.training.institution}
                handleChange={((value: string) => this.handleChange('institution', value, /./))}
              />
            </Col>
            <Col md={6}>
              <InputFormField
                id="training-diploma"
                label="Diplôme obtenu: "
                type="text"
                className="form-label"
                inputClassName={classes.InputModalTraining}
                value={this.state.training.degreeObtained}
                handleChange={(value: string) => this.handleChange('degreeObtained', value, /./)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <InputFormField
                id="training-end"
                label="Fin formation: "
                type="date"
                className="form-label"
                inputClassName={classes.InputModalTraining}
                value={this.state.training.endDate}
                handleChange={(value: string) => this.handleChange('endDate', value, yearMonthDayRegex)}
              />
            </Col>
            <Col md={6}>
              <InputFormField
                id="training-start"
                label="Début formation: "
                type="date"
                className="form-label"
                inputClassName={classes.InputModalTraining}
                value={this.state.training.startDate}
                handleChange={(value: string) => this.handleChange('startDate', value, yearMonthDayRegex)}
              />
            </Col>
          </Row>
        </Container >
        <Button
          onClick={this.handleClick}
          disabled={!this.activeButton()}
          className={classes.ButtonModalTraining}
        >
          Ajouter une formation
        </Button>
      </>
    );
  }
}

const mapState = () => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  addUserTraining: dispatch.userSelected.addUserTraining,
})

export default connect(mapState, mapDispatch)(ModalTraining);