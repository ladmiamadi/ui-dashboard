import './styles/TalentForm.css';
import { Container } from 'reactstrap';
import React from 'react';
import TalentFormAddress from './TalentFormAddress';
import TalentFormExperience from './TalentFormExperience';
import TalentFormFormation from './TalentFormFormation';
import TalentFormHead from './TalentFormHead';
import TalentFormInternship from './TalentFormInternship';
import TalentFormJob from './TalentFormJob';
import TalentFormLanguages from './TalentFormLanguages';
import TalentFormSchool from './TalentFormSchool';
import TalentFormSkills from './TalentFormSkills';

export class TalentFormContainer extends React.Component {
  render() {
    return (
      <div className="talent-form-page">
        <Container>
          <form className="talent-form">
            <TalentFormHead />
            <TalentFormAddress />
            <TalentFormSchool />
            <TalentFormInternship />
            <TalentFormJob />
            <TalentFormSkills />
            <TalentFormLanguages />
            <TalentFormFormation />
            <TalentFormExperience />
            <button className="form-button">Sauvegarder les changements</button>
          </form>
        </Container>
      </div>
    );
  }
}

export default TalentFormContainer;