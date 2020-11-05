import React from 'react';
import './styles/TalentForm.css';
import { connect } from 'react-redux';
import { Container, Form } from 'reactstrap';
import { RootState, RootDispatch } from '../../../app/state/store';
import { UpdateUserPayload } from '../../state/models/user-selected';
import { User } from '../../../app';
import classes from './styles/TalentFormPageContainer.module.css';
import TalentFormAddress from './TalentFormAddress';
import TalentFormExperience from './TalentFormExperience';
import TalentFormHead from './TalentFormHead';
import TalentFormInstitution from './TalentFormInstitution';
import TalentFormInternship from './TalentFormInternship';
import TalentFormJob from './TalentFormJob';
import TalentFormLanguages from './TalentFormLanguages';
import TalentFormSkills from './TalentFormSkills';
import TalentFormTraining from './TalentFormTraining';

interface Props {
  user: User,
  modifyUser: (payload: UpdateUserPayload) => void,
  saveUserInDb: (user: User) => Promise<void>,
}

export class TalentFormPageContainer extends React.Component<Props> {

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
