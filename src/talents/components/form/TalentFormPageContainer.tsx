import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { User } from '../../../app';
import { RootDispatch, RootState } from '../../../app/state/store';
import TalentFormHead from './TalentFormHead';
import TalentFormAddress from './TalentFormAddress';
import TalentFormInstitution  from './TalentFormInstitution';
import TalentFormInternship from './TalentFormInternship';
import TalentFormExperience from './TalentFormExperience';
import TalentFormFormation from './TalentFormFormation';
import TalentFormJob from './TalentFormJob';
import TalentFormLanguages  from './TalentFormLanguages';
import TalentFormSkills from './TalentFormSkills';

interface Props {
  user: User,
  fetchUserById: (id: number) => Promise<void>,
  isFetching: boolean,
}

export class TalentFormPageContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUserById(6);
  }

  render() {
    if (this.props.isFetching) {
      return <span>En attente du Loader</span>;
    }

    return (
      <div className="talent-form-page">
        <Container>
          <form className="talent-form">
            <TalentFormHead />
            <TalentFormAddress />
            <TalentFormInstitution />
            <TalentFormInternship />
            <TalentFormJob />
            <TalentFormSkills />
            <TalentFormLanguages />
            <TalentFormFormation />
            <TalentFormExperience />
            <button type="submit" className="form-button">Sauvegarder les changements</button>
          </form>
        </Container>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.user.user,
  isFetching: state.user.isFetching,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchUserById: dispatch.user.fetchUserById,
});

export default connect(mapState, mapDispatch)(TalentFormPageContainer);
