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

  handleDateChange = (data: UpdateUserPayload) => {
    const yearMonthDayRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i;

    if (typeof data.value === 'string') {
      console.log(yearMonthDayRegex.test(data.value));
    }

    this.props.modifyUser(data);
  }

  render() {
    return (
      <div className={classes['talent-training-section']}>
        <div className={classes['training-section-head']}>
          <h6>Formations: </h6>
          <Button
            className={classes['add-training-button']}
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
              className={classes['training-form']}
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
                startDate: (value: string) => this.handleDateChange({
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
      </div>
    );
  }
}
