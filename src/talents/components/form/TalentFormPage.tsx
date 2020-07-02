import React from 'react';
import { Container } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import TalentFormAddress from './TalentFormAddress';
import TalentFormExperience from './TalentFormExperience';
import TalentFormFormation from './TalentFormFormation';
import TalentFormHead from './TalentFormHead';
import TalentFormInstitution from './TalentFormInstitution';
import TalentFormInternship from './TalentFormInternship';
import TalentFormJob from './TalentFormJob';
import TalentFormSkills from './TalentFormSkills';
import TalentFormLanguages from './TalentFormLanguages';
import TalentFormPageContainer from './TalentFormPageContainer';
import './styles/TalentForm.css';

export class TalentFormPage extends React.Component {
  render() {
    return (
      <Container className="talent-form-container">
        <TalentFormPageContainer />
      </Container>
    );
  }
}
