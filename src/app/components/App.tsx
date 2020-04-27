import './styles/App.css';

import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TalentsListPage } from '../../talents/components/TalentsListPage';
import { store } from '../state/store';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={ store }>
          <AppContainer>
              <TalentsListPage />
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;
