import './styles/App.css';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import TalentFormPage from '../../talents/components/form/TalentFormPage';
import { store } from '../state/store';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={ store }>
          <AppContainer>
            <Route path="/talent" exact component={ TalentFormPage } />
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;
