import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { User, UserExperience } from '../../../app';
import { DateFormField } from '../../../app/components/utils/DateFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { RootDispatch } from '../../../app/state/store';
import DateSlicer from '../../helpers/DateSlicer';
import { FormatDate } from '../../index.d';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ModalExperience from '../modal/ModalExperience';
import { UserExperienceFactory } from '../../helpers/UserExperienceFactory';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
  resetExperience: () => void,
}

interface State {
  isModalShown: boolean,
  experience?: UserExperience;
}

/*function createNewUserExperience(user: User) {
  console.log(user.userExperiences?.length);
  //
  user.userExperiences?.push(UserExperienceFactory.createEmptyExperience());
  const nbExperience = user.userExperiences ? user.userExperiences.length : 1;
  console.log(user.userExperiences);
  return user.userExperiences?.length ? user.userExperiences[nbExperience - 1] : UserExperienceFactory.createEmptyExperience();
}*/

export class TalentFormExperience extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalShown: false,
    };
  }

  createNewUserExperience(user: User) {
    console.log(user.userExperiences?.length);
    //
    user.userExperiences?.push(UserExperienceFactory.createEmptyExperience());
    const nbExperience = user.userExperiences ? user.userExperiences.length : 1;
    console.log(user.userExperiences);
    return user.userExperiences?.length ? user.userExperiences[nbExperience - 1] : UserExperienceFactory.createEmptyExperience();
  }

  toggleModalAndResetModalOnQuit = () => {
    /*const newExperience = */
    if (!this.state.isModalShown) {
      //get the new userExperience created with the modal
      const exp = this.createNewUserExperience(this.props.user);
      this.setState({ experience: exp });
      console.log(this.props.user);
    }
/*    this.setState({
      experience: newExperience,
    });*/
    this.setState({ isModalShown: !this.state.isModalShown });

    /*    if (!this.state.isModalShown) {
      this.props.resetExperience();
    }*/
  }
  render() {
    //const newExperience = createNewUserExperience(this.props.user);
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Expérience: </h6>
          <Button onClick={this.toggleModalAndResetModalOnQuit}
            className="form-add-button"
            color="default">Ajouter une expérience</Button>
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
              <DateFormField
                keyName="experience-start"
                label="Début activité: "
                className="medium"
                day={DateSlicer.formatDate(elem.startDate.toString(), FormatDate.DAY)}
                month={DateSlicer.formatDate(elem.startDate.toString(), FormatDate.MONTH)}
                year={DateSlicer.formatDate(elem.startDate.toString(), FormatDate.YEAR)}
              />
              <DateFormField
                keyName="experience-end"
                label="Fin: "
                className="medium"
                day={DateSlicer.formatDate(elem.endDate.toString(), FormatDate.DAY)}
                month={DateSlicer.formatDate(elem.endDate.toString(), FormatDate.MONTH)}
                year={DateSlicer.formatDate(elem.endDate.toString(), FormatDate.YEAR)} />
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
        <ModalCustom
          isModalShown={this.state.isModalShown}
          toggleModal={this.toggleModalAndResetModalOnQuit}
          titleModal="Ajouter une expérience"
        >
          <ModalExperience
            userSelected={this.props.user}
            modifyUser={this.props.modifyUser}
            experience={this.state.experience}
          />
        </ModalCustom>
      </div>
    );
  }
}

const mapState = () => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  resetExperience: dispatch.addExperience.resetExperience,
});

export default connect(mapState, mapDispatch)(TalentFormExperience);
