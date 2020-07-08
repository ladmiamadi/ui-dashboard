import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { UserTraining, Training } from '../../../app';
import { UserTrainingFactory } from '../../helpers/UserTrainingFactory';
import { RootDispatch } from '../../../app/state/store';
import InputFormField from '../../../app/components/utils/InputFormField';
import lodash from 'lodash';

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

  updateIsFormValid = (property: keyof IsFormValid, value: string) => {
    const copyOfIsFormValid = { ...this.state.isFormValid };

    if (property !== 'id') {
      copyOfIsFormValid[property] = Boolean(value);
    }
    console.log(copyOfIsFormValid);

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

  handleChange = <T, U>(property: keyof Training<T, U>, value: string) => {
    this.updateIsFormValid(property, value);

    this.updateTraining(property, value);
  }

  handleClick = () => {
    this.props.addUserTraining(lodash.cloneDeep(this.state.training));

    this.resetState();
  }

  render() {
    return (
      <>
        <InputFormField
          id="formation-school"
          label="École: "
          type="text"
          value={this.state.training.institution}
          handleChange={((value: string) => this.handleChange('institution', value))}
        />
        <InputFormField
          id="formation-start"
          label="Début formation: "
          type="date"
          value={this.state.training.startDate}
          handleChange={(value: string) => this.handleChange('startDate', value)}
        />
        <InputFormField
          id="formation-end"
          label="Fin formation: "
          type="date"
          value={this.state.training.endDate}
          handleChange={(value: string) => this.handleChange('endDate', value)}
        />
        <InputFormField
          id="formation-diploma"
          label="Diplôme obtenu: "
          type="text"
          value={this.state.training.degreeObtained}
          handleChange={(value: string) => this.handleChange('degreeObtained', value)}
        />
        <Button
          onClick={this.handleClick}
          disabled={!this.activeButton()}
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