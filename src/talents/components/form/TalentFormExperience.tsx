import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Button, Col, Row } from 'reactstrap';
import { User } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import InputFormField from '../../../app/components/utils/InputFormField';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ModalExperience from '../modal/ModalExperience';
import './styles/TalentFormExperience.css';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

interface State {
  isModalOpen: boolean,
}

export default class TalentFormExperience extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Expérience: </h6>
          <Button
            className="form-add-button"
            color="default"
            onClick={this.toggleModal}
          >Ajouter une expérience</Button>
        </div>
        <div className="form-elements">
        
          {
                this.props.user.userExperiences?.map((elem, index) => (
                  <Row>
                    <Col sm={12} md={6}>
                      <InputFormField
                        id={'company-form' + index}
                        //keyName="experience-company"
                        label="Entreprise: "
                        //className="large"
                        type="text"
                        handleChange={(value: string) => this.props.modifyUser({
                          category: 'userExperiences',
                          property: 'company',
                          value: value,
                          index: index,
                        })}
                        value={elem.company}
                      />
                    </Col>
                    <Col sm={12} md={6}>
                      <InputFormField
                        id={'experience-position' + index}
                        label="Poste: "
                        //className="large"
                        type="text"
                        handleChange={(value: string) => this.props.modifyUser({
                          category: 'userExperiences',
                          property: 'position',
                          value: value,
                          index: index,
                        })}
                        value={elem.position} />
                    </Col>
                    <Col sm={12} md={6}>
                      <label className="form-label label-date-experience">date de début: </label>
                      <ReactDatePicker
                        className="medium"
                        selected={elem.startDate}
                        onChange={(value) => this.props.modifyUser({
                          category: 'userExperiences',
                          property: 'startDate',
                          value: value,
                          index: index,
                        })}
                      />
                    </Col>
                    <Col sm={12} md={6}>
                      <label className="form-label">date de fin: </label>
                      <ReactDatePicker
                        className="medium"
                        selected={elem.endDate}
                        onChange={(value) => this.props.modifyUser({
                          category: 'userExperiences',
                          property: 'endDate',
                          value: value,
                          index: index,
                        })}
                      />
                    </Col>
                    <FieldForm
                      keyName="experience-works"
                      label="Tâches effectuées: "
                      className="large"
                      rows={5}
                      type="textarea"
                      handleChange={(value: string) => this.props.modifyUser({
                        category: 'userExperiences',
                        property: 'task',
                        value: value,
                        index: index,
                      })}
                      value={elem.task} />
                  </Row>
                ))}
        
        </div>
        {        
          <ModalCustom
            isModalShown={this.state.isModalOpen}
            toggleModal={this.toggleModal}
            titleModal="Ajouter une langue"
          >
            <ModalExperience
              toggleModal={this.toggleModal}
            />
          </ModalCustom>}
      </div>
    );
  }
}
