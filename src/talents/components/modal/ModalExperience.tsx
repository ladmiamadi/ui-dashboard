import React from 'react';
import DatePicker from 'react-date-picker';
import ReactDatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { UserExperience } from '../../../app/index';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UpdateExperiencePayload } from '../../state/models/experiences/addExperience';

interface Props {
  addUserExperience: (payload: UserExperience) =>void,
  updateExperience: (payload: UpdateExperiencePayload) =>void,
  experience: UserExperience,
}

export class ModalExperience extends React.Component<Props> {

  updateExperience = (property: string, value: string | Date) => {
    this.props.updateExperience({ property, value });
  }

  handleClick = () => {
    this.props.addUserExperience({ ...this.props.experience });
  }
  isFormValid = () => {
    return this.props.experience.company !== '' && this.props.experience.task !== ''
      && this.props.experience.position !== '' && this.props.experience.startDate !== null;
  }

  render() {
    return (
      <>
        <FieldForm
          keyName="experience-modal-company"
          label="company : "
          type="text"
          handleChange={(value: string) => this.props.updateExperience({
            property: 'company',
            value: value,
          })}
          value={this.props.experience.company}
        />
        <FieldForm
          keyName="experience-modal-position"
          label="Poste: "
          className="large"
          type="text"
          handleChange={(value: string) => this.props.updateExperience({
            property: 'position',
            value: value,
          })}
          value={this.props.experience.position} />
        <FieldForm
          keyName="experience-modal-works"
          label="Tâches effectuées: "
          className="large"
          rows={5}
          type="textarea"
          handleChange={(value: string) => this.props.updateExperience({
            property: 'task',
            value: value,
          })}
          value={this.props.experience.task} />
        <label> Date de début: </label>
        <ReactDatePicker
          value={this.props.experience.startDate}
          onChange={(value) => this.props.updateExperience({
            property: 'startDate',
            value: value,
          })}
        />
        <label>date de fin: </label>
        <DatePicker
          value={this.props.experience.endDate}
          onChange={(value) => this.props.updateExperience({
            property: 'endDate',
            value: value,
          })}
        />
        <Button
          disabled={!this.isFormValid()}
          className="form-add-button modal-button"
          color="default"
          onClick={this.handleClick}
        >
          Ajouter une expérience
        </Button>
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  experience: state.addExperience.experience,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateExperience: dispatch.addExperience.updateExperience,
  addUserExperience: dispatch.userSelected.addUserExperience,
});

export default connect(mapState, mapDispatch)(ModalExperience);
