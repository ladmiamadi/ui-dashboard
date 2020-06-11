import React from 'react';
import { Container } from 'reactstrap';
import  TalentFormPageContainer  from './TalentFormPageContainer';
import './styles/TalentForm.css';

export default class TalentFormPage extends React.Component {
  render() {
    return (
      <Container className="talent-form-container">
        <TalentFormPageContainer />
      </Container>
    );
  }
}
