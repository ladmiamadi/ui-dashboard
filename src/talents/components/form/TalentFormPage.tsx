import './styles/TalentForm.css';
import React from 'react';
import { Container } from 'reactstrap';
import  TalenFormPageContainer  from './TalenFormPageContainer';

export default class TalentFormPage extends React.Component {
  render() {
    return (
      <Container className="talent-form-container">
        <TalenFormPageContainer />
      </Container>
    );
  }
}
