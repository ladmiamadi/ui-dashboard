import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';
import './styles/TalentForm.css';
import TalentFormPageContainer from './TalentFormPageContainer';

class TalentFormPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <Container className="talent-form-container">
        <TalentFormPageContainer />
      </Container>
    );
  }
}

export default TalentFormPage;
