import React from 'react';
import fr from 'date-fns/locale/fr';
import ReactDatePicker from 'react-datepicker';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { User } from '../../../app';
import InputFormField from '../../../app/components/utils/InputFormField';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { RootDispatch } from '../../../app/state/store';
import { UpdateUserPayload } from '../../state/models/user-selected';
import ModalExperience from '../modal/ModalExperience';
import classes from './styles/TalentFormExperience.module.css';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
  resetExperience: () => void;
  removeUserExperience: (experienceIndex: number) => void,
}

interface State {
  isModalOpen: boolean,
}

export class TalentFormExperience extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
    if (!this.state.isModalOpen)
      this.props.resetExperience();
  }

  handleClick = (experienceIndex: number) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Vous êtes sûr de vouloir supprimer ce Expérience?',
      buttons: [
        {
          label: 'Oui',
          onClick: () => this.props.removeUserExperience(experienceIndex),
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
      <div className="form-section">
        <div className="section-add">
          <h6>Expériences: </h6>
          <Button
            className="form-add-button"
            color="default"
            onClick={this.toggleModal}
          >Ajouter une expérience</Button>
        </div>
        <div className="form-elements">
          {
            this.props.user.userExperiences?.map((elem, index) => (
              <>
                <Row key={'row' + index} className={classes['experience-form']}>
                  <Col sm={12} md={6}>
                    <InputFormField
                      id={'company-form' + index}
                      label="Entreprise: "
                      className={{ input: classes['experience-input'], label: classes['experience-label'] }}
                      type="text"
                      handleChange={(value: string) => this.props.modifyUser({
                        category: 'userExperiences',
                        property: 'company',
                        value,
                        index,
                      })}
                      value={elem.company} />
                  </Col>
                  <Col sm={12} md={6}>
                    <InputFormField
                      id={'experience-position' + index}
                      label="Poste: "
                      className={{ input: classes['experience-input'], label: classes['experience-label'] }}
                      type="text"
                      handleChange={(value: string) => this.props.modifyUser({
                        category: 'userExperiences',
                        property: 'position',
                        value,
                        index,
                      })}
                      value={elem.position} />
                  </Col>
                  <Col className={classes['experience-date-picker']} sm={12} md={6}>
                    <label className={classes['label-date-experience']}>Date de début: </label>
                    <ReactDatePicker
                      className={classes['experience-datepicker']}
                      selected={elem.startDate}
                      isClearable
                      dateFormat="dd/MM/yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      locale={fr}
                      onChange={(value) => this.props.modifyUser({
                        category: 'userExperiences',
                        property: 'startDate',
                        value,
                        index,
                      })} />
                  </Col>
                  <Col className={classes['experience-date-picker']} sm={12} md={6}>
                    <label className={classes['label-date-experience']}>Date de fin: </label>
                    <ReactDatePicker
                      className={classes['experience-datepicker']}
                      selected={elem.endDate}
                      isClearable
                      dateFormat="dd/MM/yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      fixedHeight={true}
                      locale={fr}
                      onChange={(value) => this.props.modifyUser({
                        category: 'userExperiences',
                        property: 'endDate',
                        value,
                        index,
                      })} />
                  </Col>
                  <Col md={12}>
                    <InputFormField
                      id={'task' + index}
                      label="Tâches effectuées: "
                      className={{ input: classes['experience-textarea'], label: classes['experience-label'] }}
                      type="textarea"
                      handleChange={(value: string) => this.props.modifyUser({
                        category: 'userExperiences',
                        property: 'task',
                        value,
                        index,
                      })}
                      value={elem.task} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type="button" color="secondary" size="lg"
                      onClick={() => this.handleClick(index)}>Supprimer experience
                    </Button>
                  </Col>
                </Row>
              </>
            ))}
        </div>
        <ModalCustom
          isModalShown={this.state.isModalOpen}
          toggleModal={this.toggleModal}
          titleModal="Ajouter une expérience"
          className={classes['experience-modal']}>
          <ModalExperience
            toggleModal={this.toggleModal}
          />
        </ModalCustom>
      </div>
    );
  }
}

const mapState = () => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  resetExperience: dispatch.addExperience.resetExperience,
  removeUserExperience: dispatch.userSelected.removeUserExperience,
});

export default connect(mapState, mapDispatch)(TalentFormExperience);
