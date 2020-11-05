import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Button } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UpdateExperiencePayload } from '../../state/models/experiences/addExperience';
import { UserExperience } from '../../../app/index';
import classes from '../form/styles/TalentFormExperience.module.css';
import fr from 'date-fns/locale/fr';
import InputFormField from '../../../app/components/utils/InputFormField';
import ReactDatePicker from 'react-datepicker';

interface Props {
  experience: UserExperience,
  addUserExperience: (payload: UserExperience) => void,
  updateExperience: (payload: UpdateExperiencePayload) => void,
  toggleModal: () => void;
}

export class ModalExperience extends React.Component<Props> {
  updateExperience = (property: string, value: string | Date) => {
    this.props.updateExperience({ property, value });
  }

  handleClick = () => {
    if (!this.props.experience.endDate) {
      confirmAlert({
        title: 'Confirmation',
        message: 'Il n\'y a pas de date de fin, voulez vous sauvegarder ?',
        buttons: [
          {
            label: 'Oui',
            onClick: () => {
              this.props.addUserExperience({ ...this.props.experience });
              this.props.toggleModal();
            },
          },
          {
            label: 'Non',
            onClick: () => { },
          },
        ],
      });
    }
    else {
      this.props.addUserExperience({ ...this.props.experience });
      this.props.toggleModal();
    }
  }

  isFormValid = () => {
    return this.props.experience.company !== '' && this.props.experience.task !== ''
      && this.props.experience.position !== '' && this.props.experience.startDate !== null;
  }

  render() {
    return (
      <>
        <InputFormField
          id={'company-form'}
          label="Entreprise: "
          className={{ input: classes['experience-input'], label: classes['experience-label'] }}
          type="text"
          handleChange={(value: string) => this.props.updateExperience({
            property: 'company',
            value: value,
          })}
          value={this.props.experience.company}
        />
        <InputFormField
          id="modal-position"
          label="Poste: "
          className={{ input: classes['experience-input'], label: classes['experience-label'] }}
          type="text"
          handleChange={(value: string) => this.props.updateExperience({
            property: 'position',
            value: value,
          })}
          value={this.props.experience.position}
        />
        <div className={classes['experience-date-picker']}>
          <label className={classes['label-date-experience']}> Date de début: </label>
          <ReactDatePicker
            selected={this.props.experience.startDate}
            isClearable
            dateFormat="dd/MM/yyyy"
            className={classes['experience-datepicker']}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            locale={fr}
            onChange={(value) => this.props.updateExperience({
              property: 'startDate',
              value: value,
            })}
          />
        </div>
        <div className={classes['experience-date-picker']}>
          <label className={classes['label-date-experience']}>date de fin: </label>
          <ReactDatePicker
            selected={this.props.experience.endDate}
            isClearable
            dateFormat="dd/MM/yyyy"
            className={classes['experience-datepicker']}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            locale={fr}
            onChange={(value) => this.props.updateExperience({
              property: 'endDate',
              value: value,
            })}
          />
        </div>
        <InputFormField
          id="experience-modal-works"
          label="Tâches effectuées: "
          className={{ input: classes['experience-textarea'], label: classes['experience-label'] }}
          type="textarea"
          handleChange={(value: string) => this.props.updateExperience({
            property: 'task',
            value: value,
          })}
          value={this.props.experience.task}
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
