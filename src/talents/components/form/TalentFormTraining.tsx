import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { User } from '../../../app';
import { RootDispatch } from '../../../app/state/store';
import { UpdateUserPayload } from '../../state/models/user-selected';
import ModalTraining from '../modal/ModalTraining';
import TrainingForm from './TrainingForm';
import classes from './styles/TalentFormTraining.module.css';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
  removeUserTraining: (trainingIndex: number) => void,
}

interface State {
  isModalOpen: boolean,
}

export class TalentFormTraining extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleClick = (trainingIndex: number) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Vous êtes sûr de vouloir supprimer ce formation?',
      buttons: [
        {
          label: 'Oui',
          onClick: () => this.props.removeUserTraining(trainingIndex),
        },
        {
          label: 'Non',
          onClick: () => { },
        },
      ],
    });
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
            <>
              <TrainingForm
                key={index}
                className={classes['training-form']}
                idComplement={index}
                training={elem}
                handleChange={{
                  institution: (value) => this.props.modifyUser({
                    category: 'userTrainings',
                    property: 'institution',
                    value,
                    index,
                  }),
                  degreeObtained: (value) => this.props.modifyUser({
                    category: 'userTrainings',
                    property: 'degreeObtained',
                    value,
                    index,
                  }),
                  startDate: (value: Date | null) => this.props.modifyUser({
                    category: 'userTrainings',
                    property: 'startDate',
                    value,
                    index,
                  }),
                  endDate: (value: Date | null) => this.props.modifyUser({
                    category: 'userTrainings',
                    property: 'endDate',
                    value,
                    index,
                  }),
                }}
              />
              <Button type="button" color="secondary" size="lg"
                onClick={() => this.handleClick(index)}>Supprimer formation
              </Button>
            </>
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

const mapState = () => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  removeUserTraining: dispatch.userSelected.removeUserTraining,
});

export default connect(mapState, mapDispatch)(TalentFormTraining);