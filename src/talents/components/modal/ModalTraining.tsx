import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { UserTraining, Training } from '../../../app';
import { UserTrainingFactory } from '../../helpers/UserTrainingFactory';
import { RootDispatch } from '../../../app/state/store';
import TrainingForm from '../form/TrainingForm';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import classes from './styles/ModalTraining.module.css';


interface Props {
  isModalOpen: boolean,
  addUserTraining: (payload: UserTraining) => void,
  toggleModal: () => void,
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

    this.setState((prevState) => ({ ...prevState, isFormValid: copyOfIsFormValid }));
  }

  updateTraining = (property: keyof UserTraining, value: string) => {
    const copyOfUserTrainingState = { ...this.state.training };

    if (property !== 'id') {
      copyOfUserTrainingState[property] = value;
    }

    this.setState((prevState) => ({ ...prevState, training: copyOfUserTrainingState }));
  }

  activeButton = (): boolean => {
    let key: keyof IsFormValid;
    let isButtonActived = true;

    for (key in this.state.isFormValid) {
      if (key !== 'id') {
        isButtonActived = isButtonActived && this.state.isFormValid[key];
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
    this.props.addUserTraining({ ...this.state.training });

    this.resetState();
  }

  render() {
    const yearMonthDayRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i;

    return (
      <ModalCustom
        isModalShown={this.props.isModalOpen}
        toggleModal={this.props.toggleModal}
        titleModal="Ajouter une formation"
      >
        <TrainingForm
          training={{ ...this.state.training }}
          handleChange={{
            institution: (value: string) => this.handleChange('institution', value, /./),
            degreeObtained: (value: string) => this.handleChange('degreeObtained', value, /./),
            startDate: (value: string) => this.handleChange('startDate', value, yearMonthDayRegex),
            endDate: (value: string) => this.handleChange('endDate', value, yearMonthDayRegex),
          }}
        />
        <Button
          onClick={this.handleClick}
          disabled={!this.activeButton()}
          className={classes['button-modal-training']}
        >
          Ajouter une formation
        </Button>
      </ModalCustom>
    );
  }
}

const mapState = () => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  addUserTraining: dispatch.userSelected.addUserTraining,
})

export default connect(mapState, mapDispatch)(ModalTraining);