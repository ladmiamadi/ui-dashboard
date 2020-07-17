import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Training } from '../../../app';
import { UserTrainingFactory } from '../../helpers/UserTrainingFactory';
import { RootDispatch } from '../../../app/state/store';
import TrainingForm from '../form/TrainingForm';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { InputState } from '../../index.d';
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

type ExcludeIdKeyFromTraining<T, U> = Omit<Training<T, U>, 'id'>;

export type IsFormValid = ExcludeIdKeyFromTraining<InputState, number>;
export type UserTraining = ExcludeIdKeyFromTraining<string, number>;


export class ModalTraining extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFormValid: UserTrainingFactory.createEmptyFormValid(),
      training: UserTrainingFactory.createEmptyUserTraining(),
    };
  }

  handleChange = <T, U>(property: keyof ExcludeIdKeyFromTraining<T, U>, value: string, regexp: RegExp) => {
    this.updateIsFormValid(property, value, regexp);

    this.updateTraining(property, value);
  }

  updateIsFormValid = (property: keyof IsFormValid, value: string, regexp: RegExp) => {
    const isFormValid = { ...this.state.isFormValid };

    isFormValid[property] = regexp.test(value) ? InputState.TRUE : InputState.FALSE;

    this.setState((prevState) => ({ ...prevState, isFormValid }));
  }

  updateTraining = (property: keyof UserTraining, value: string) => {
    const training = { ...this.state.training };

    training[property] = value;

    this.setState((prevState) => ({ ...prevState, training }));
  }

  activeButton = (): boolean => {
    let isButtonActived = true;
    let key: keyof IsFormValid;

    for (key in this.state.isFormValid) {
      isButtonActived = isButtonActived && (this.state.isFormValid[key] === InputState.TRUE);
    }

    return isButtonActived;
  }

  handleClick = () => {
    this.props.addUserTraining({ ...this.state.training });

    this.resetState();
  }

  resetState = () => {
    this.setState({
      isFormValid: UserTrainingFactory.createEmptyFormValid(),
      training: UserTrainingFactory.createEmptyUserTraining(),
    })
  }

  toggleModal = () => {
    this.resetState();

    this.props.toggleModal();
  }

  render() {
    const yearMonthDayRegex = /^(\d{1,4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i;

    return (
      <ModalCustom
        className={classes['title-modal-training']}
        isModalShown={this.props.isModalOpen}
        toggleModal={this.toggleModal}
        titleModal="Ajouter une formation"
      >
        <TrainingForm
          training={{ ...this.state.training }}
          isFieldInvalid={{
            institution: this.state.isFormValid.institution === InputState.FALSE,
            degreeObtained: this.state.isFormValid.degreeObtained === InputState.FALSE,
            startDate: this.state.isFormValid.startDate === InputState.FALSE,
            endDate: this.state.isFormValid.endDate === InputState.FALSE,
          }}
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