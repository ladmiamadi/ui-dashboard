/* eslint-disable sort-imports */
import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import TalentFormContainer from './talent/TalentFormContainer';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={ store }>
          <AppContainer>
            <TalentFormContainer />
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;