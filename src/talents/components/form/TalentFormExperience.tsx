import React from 'react';
import DatePicker from 'react-date-picker';
import { Button } from 'reactstrap';
import { User } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ModalExperience from '../modal/ModalExperience';

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
          <Button className="form-add-button" onClick={this.toggleModal}>Ajouter une expérience</Button>
        </div>
        {
          this.props.user.userExperiences?.map((elem, index) => (
            <div className="form-elements" key={index}>
              <FieldForm
                keyName="experience-company"
                label="Entreprise: "
                className="large"
                type="text"
                handleChange={(value: string) => this.props.modifyUser({
                  category: 'userExperiences',
                  property: 'company',
                  value: value,
                  index: index,
                })}
                value={elem.company}
              />
              <label>date de début: </label>
              <DatePicker
                className="medium"
                value={elem.startDate}
                onChange={(value) => this.props.modifyUser({
                  category: 'userExperiences',
                  property: 'startDate',
                  value: value,
                  index: index,
                })}
              />
              <label>date de fin: </label>
              <DatePicker
                className="medium"
                value={elem.endDate}
                onChange={(value) => this.props.modifyUser({
                  category: 'userExperiences',
                  property: 'endDate',
                  value: value,
                  index: index,
                })}
              />
              <FieldForm
                keyName="experience-position"
                label="Poste: "
                className="large"
                type="text"
                handleChange={(value: string) => this.props.modifyUser({
                  category: 'userExperiences',
                  property: 'position',
                  value: value,
                  index: index,
                })}
                value={elem.position} />
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
            </div>
          ))
        }
        {        
          <ModalCustom
            isModalShown={this.state.isModalOpen}
            toggleModal={this.toggleModal}
            titleModal="Ajouter une langue"
          >
            <ModalExperience

            />
          </ModalCustom>}
      </div>
    );
  }
}
