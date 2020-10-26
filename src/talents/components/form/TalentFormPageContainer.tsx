import React from 'react';
import { connect } from 'react-redux';
import { Container, Form } from 'reactstrap';
import { User } from '../../../app';
import { RootState, RootDispatch } from '../../../app/state/store';
import TalentFormHead from './TalentFormHead';
import TalentFormAddress from './TalentFormAddress';
import TalentFormInstitution  from './TalentFormInstitution';
import TalentFormInternship from './TalentFormInternship';
import TalentFormExperience from './TalentFormExperience';
import TalentFormTraining from './TalentFormTraining';
import TalentFormJob from './TalentFormJob';
import TalentFormLanguages from './TalentFormLanguages';
import TalentFormSkills from './TalentFormSkills';
//import TalentFormFormation from "./TalentFormFormation";
import { UpdateUserPayload } from '../../state/models/userSelected';
import classes from './styles/TalentFormPageContainer.module.css';
import './styles/TalentForm.css';

interface Props {
  user: User,
  modifyUser: (payload: UpdateUserPayload) => void,
  saveUserInDb: (user: User) => Promise<void>,
}

export class TalentFormPageContainer extends React.Component<Props> {

  handleSubmit(event: any) {
    event.preventDefault();

    this.props.saveUserInDb(this.props.user);
  }

  render() {
    return (
      <div className="talent-form-page">
        <Container>
          <Form onSubmit={(event) => this.handleSubmit(event)}
          className={classes.TalentFormContainer}>
            <TalentFormHead {...this.props} />
            <TalentFormAddress {...this.props} />
            <TalentFormInstitution {...this.props} />
            <TalentFormInternship {...this.props} />
            <TalentFormJob {...this.props} />
            <TalentFormSkills />
            {/* <TalentFormFormation {...this.props} /> */}
            <TalentFormLanguages {...this.props} />
            <TalentFormTraining {...this.props} />
            <TalentFormExperience {...this.props} />
            <button
              type="submit"
              className={classes.TalentFormButton}
            >
              Sauvegarder les changements
            </button>
          </Form>
        </Container>
      </div>
      
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.userSelected.userSelected,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.userSelected.modifyUser,
  saveUserInDb: dispatch.userSelected.saveUserInDb,
});

export default connect(mapState, mapDispatch)(TalentFormPageContainer);
