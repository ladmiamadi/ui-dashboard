import React from 'react';
import { Button } from 'reactstrap';
import { User } from '../../../app';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ModalTraining from '../modal/ModalTraining';
import TrainingForm from './TrainingForm';
import classes from './styles/TalentFormTraining.module.css';

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
      <div className={classes.TalentTrainingSection}>
        <div className={classes.TrainingSectionHead}>
          <h6>Formations: </h6>
          <Button
            className={classes.AddTrainingButton}
            color="default"
            onClick={this.toggleModal}
          >
            Ajouter une formation
          </Button>
        </div>
        {
          this.props.user.userTrainings?.map((elem, index) => (
            <TrainingForm
              key={index}
              className={classes.TrainingForm}
              idComplement={index}
              training={elem}
              handleChange={{
                institution: (value) => this.props.modifyUser({
                  category: 'userTrainings',
                  property: 'institution',
                  value: value,
                  index: index,
                }),
                degreeObtained: (value) => this.props.modifyUser({
                  category: 'userTrainings',
                  property: 'degreeObtained',
                  value: value,
                  index: index,
                }),
                startDate: (value: string) => this.props.modifyUser({
                  category: 'userTrainings',
                  property: 'startDate',
                  value: value,
                  index: index,
                }),
                endDate: (value: string) => this.props.modifyUser({
                  category: 'userTrainings',
                  property: 'endDate',
                  value: value,
                  index: index,
                }),
              }}
            />
          ))
        }
        <ModalTraining
          isModalOpen={this.state.isModalOpen}
          toggleModal={this.toggleModal}
        />
      </div >
    );
  }
}
