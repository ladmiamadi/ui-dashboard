import React from 'react';
import { connect } from 'react-redux';
import { Container, Form } from 'reactstrap';
import { User } from '../../../app';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UpdateUserPayload } from '../../state/models/user-selected';
import TalentFormAddress from './TalentFormAddress';
import TalentFormExperience from './TalentFormExperience';
import TalentFormHead from './TalentFormHead';
import TalentFormInstitution from './TalentFormInstitution';
import TalentFormInternship from './TalentFormInternship';
import TalentFormJob from './TalentFormJob';
import TalentFormLanguages from './TalentFormLanguages';
import TalentFormRecruitment from './TalentFormRecruitment';
import TalentFormSkills from './TalentFormSkills';
import TalentFormTraining from './TalentFormTraining';
import './styles/TalentForm.css';
import classes from './styles/TalentFormPageContainer.module.css';

interface Props {
  users: User[],
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
    if (this.props.user.id === -1) {
      window.location.href = '/talents';
    }

    return (
      <div className="talent-form-page">
        <Container>
          <Form onSubmit={(event) => this.handleSubmit(event)}
            className={classes.TalentFormContainer}>
            <TalentFormHead {...this.props} />
            <TalentFormRecruitment {...this.props} />
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
              className={classes.TalentFormButton + ' with-border'}
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
  users: state.users.users,
  user: state.userSelected.userSelected,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.userSelected.modifyUser,
  saveUserInDb: dispatch.userSelected.saveUserInDb,
});

export default connect(mapState, mapDispatch)(TalentFormPageContainer);
