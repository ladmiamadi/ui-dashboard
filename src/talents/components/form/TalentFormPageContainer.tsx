import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { User } from '../../../app';
import { RootState } from '../../../app/state/store';
import TalentFormHead from './TalentFormHead';
import TalentFormAddress from './TalentFormAddress';
import TalentFormInstitution  from './TalentFormInstitution';
import TalentFormInternship from './TalentFormInternship';
import TalentFormExperience from './TalentFormExperience';
import TalentFormFormation from './TalentFormFormation';
import TalentFormJob from './TalentFormJob';
import TalentFormLanguages from './TalentFormLanguages';
import TalentFormSkills from './TalentFormSkills';

interface Props {
  user: User,
}

export class TalentFormPageContainer extends React.Component<Props> {

  render() {
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
  user: state.userSelected.userSelected,
});

const mapDispatch = () => ({});

export default connect(mapState, mapDispatch)(TalentFormPageContainer);
