/* eslint-disable sort-imports */
import React from 'react';
import './styles/TalentForm.css';
import TalentFormHead from './TalentFormHead';
import TalentFormAddress from './TalentFormAddress';
import TalentFormSchool from './TalentFormSchool';
import TalentFormInternship from './TalentFormInternship';
import TalentFormJob from './TalentFormJob';
import TalentFormSkills from './TalentFormSkills';
import TalentFormLanguages from './TalentFormLanguages';
import TalentFormFormation from './TalentFormFormation';
import TalentFormExperience from './TalentFormExperience';

export class TalentFormContainer extends React.Component {
  render() {
    return(
      <div className="talent-form-page">
        <form action="#" method="post">
          <TalentFormHead />
          <TalentFormAddress />
          <TalentFormSchool />
          <TalentFormInternship />
          <TalentFormJob />
          <TalentFormSkills />
          <TalentFormLanguages />
          <TalentFormFormation />
          <TalentFormExperience />
          <button type="submit">Sauvegarder les changements</button>
        </form>
      </div>
    );
  }
}

export default TalentFormContainer;