import './styles/App.css';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TalentFormContainer from '../../talents/components/form/TalentFormContainer';
import { store } from '../state/store';

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