import React from 'react';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { UserTraining } from '../../../app';
import { UserTrainingFactory } from '../../helpers/UserTrainingFactory';
import { Button } from 'reactstrap';
import { RootDispatch } from '../../../app/state/store';
import { connect } from 'react-redux';
import DatePickerField from '../../../app/components/utils/DatePickerField';

interface Props {
  addUserTraining: (payload: UserTraining) => void,
}

interface State {
  training: UserTraining,
}

export class ModalTraining extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      training: UserTrainingFactory.createEmptyUserTraining(),
    };
  }

  handleChange = (property: keyof UserTraining, value: string) => {
    const copyOfUserTrainingState = { ...this.state.training };

    if (property !== 'id' && property !== 'startDate' && property !== 'endDate') {
      copyOfUserTrainingState[property] = value;

    } else if (property !== 'id') {
      copyOfUserTrainingState[property] = new Date(value);
    }

    console.log(copyOfUserTrainingState);

    this.setState({ training: copyOfUserTrainingState })
  }

  handleClick = () => {
    this.props.addUserTraining(this.state.training);
  }

  render() {
    return (
      <>
        <FieldForm
          keyName="formation-school"
          label="École: "
          type="text"
          handleChange={((value: string) => this.handleChange('institution', value))}
          value={this.state.training.institution}
        />
        <DatePickerField
          id="Training-start"
          label="Début formation: "
          handleChange={(value: string) => this.handleChange('startDate', value)}
        />
        <DatePickerField
          id="Training-end"
          label="Fin formation: "
          handleChange={(value: string) => this.handleChange('endDate', value)}
        />
        <FieldForm
          keyName="formation-diploma"
          label="Diplôme obtenu: "
          type="text"
          handleChange={(value: string) => this.handleChange('degreeObtained', value)}
        />
        <Button onClick={this.handleClick}>
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