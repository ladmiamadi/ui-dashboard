import './styles/TalentForm.css';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import React from 'react';
import { User } from '../../../app';
import TalentFormAddress from './TalentFormAddress';
import TalentFormExperience from './TalentFormExperience';
import TalentFormFormation from './TalentFormFormation';
import TalentFormHead from './TalentFormHead';
import TalentFormInstitution from './TalentFormInstitution';
import TalentFormInternship from './TalentFormInternship';
import TalentFormJob from './TalentFormJob';
import TalentFormLanguages from './TalentFormLanguages';
import TalentFormSkills from './TalentFormSkills';
import { RootDispatch, RootState } from '../../../app/state/store';

interface Props {
  user: User,
  fetchUserById : (id: number) => Promise<void>,
  isFetching: boolean
}

export class TalentFormPage extends React.Component<Props> {
  async componentDidMount() {
    await this.props.fetchUserById(1);
  }

  render() {
    return (
      <div className="talent-form-page">
        <Container>
          <form className="talent-form">
            <TalentFormHead talent={ this.props.user }/>
            <TalentFormAddress talent={ this.props.user }/>
            <TalentFormInstitution talent={ this.props.user }/>
            <TalentFormInternship talent={ this.props.user }/>
            <TalentFormJob talent={ this.props.user }/>
            <TalentFormSkills talent={ this.props.user }/>
            <TalentFormLanguages talent={ this.props.user }/>
            <TalentFormFormation talent={ this.props.user }/>
            <TalentFormExperience talent={ this.props.user }/>
            <button className="form-button">Sauvegarder les changements</button>
          </form>
        </Container>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.user.user
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchUserById: dispatch.user.fetchUserById,
});

export default connect(mapState, mapDispatch)(TalentFormPage);
