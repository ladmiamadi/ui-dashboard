import React from 'react';
import { Container } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import TalentFormPageContainer from './TalentFormPageContainer';
import './styles/TalentForm.module.css';

export default class TalentFormPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <Container className="talent-form-container">
        <TalentFormPageContainer />
      </Container>
    );
  }
}
