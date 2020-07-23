import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Training } from '../../../app';
import { TrainingFactory } from '../../helpers/TrainingFactory';
import { RootDispatch } from '../../../app/state/store';
import TrainingForm from '../form/TrainingForm';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { InputState } from '../../index.d';
import { FormValidator } from '../../helpers/FormValidator';
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

type ExcludeIdPropertyFromTraining<T, U, D=T> = Omit<Training<T, U, D>, 'id'>;

export type IsFormValid = ExcludeIdPropertyFromTraining<InputState, number>;
export type UserTraining = ExcludeIdPropertyFromTraining<string, number, Date | null>;

export class ModalTraining extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFormValid: TrainingFactory.createEmptyFormValid(),
      training: TrainingFactory.createEmptyUserTraining(),
    };
  }

  handleChange = <T, U>(property: keyof ExcludeIdPropertyFromTraining<T, U>, value: string | Date | null) => {
    this.updateIsFormValid(property, value);

    this.updateTraining(property, value);
  }

  updateIsFormValid = (property: keyof IsFormValid, value: string | Date | null) => {
    const isFormValid = { ...this.state.isFormValid };

    isFormValid[property] = value ? InputState.TRUE : InputState.FALSE;

    this.setState((prevState) => ({ ...prevState, isFormValid }));
  }

  updateTraining = (property: keyof UserTraining, value: string | Date | null) => {
    const training = { ...this.state.training };
    if (typeof value === 'string' && (property === 'institution' || property === 'degreeObtained' ))
      training[property] = value;
    else if ((property === 'startDate' || property === 'endDate') && (value === null || value instanceof Date))
      training[property] = value;

    this.setState((prevState) => ({ ...prevState, training }));
  }

  handleClick = () => {
    this.props.addUserTraining({ ...this.state.training });

    this.resetState();
  }

  resetState = () => {
    this.setState({
      isFormValid: TrainingFactory.createEmptyFormValid(),
      training: TrainingFactory.createEmptyUserTraining(),
    });
  }

  toggleModal = () => {
    this.resetState();

    this.props.toggleModal();
  }

  render() {
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
          }}
          handleChange={{
            institution: (value: string) => this.handleChange('institution', value),
            degreeObtained: (value: string) => this.handleChange('degreeObtained', value),
            startDate: (value: Date | null) => this.handleChange('startDate', value),
            endDate: (value: Date | null) => this.handleChange('endDate', value),
          }}
        />
        <Button
          onClick={this.handleClick}
          disabled={!FormValidator.isAllFieldValidated<IsFormValid>(this.state.isFormValid)}
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
});

export default connect(mapState, mapDispatch)(ModalTraining);
