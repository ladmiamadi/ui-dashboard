import './styles/App.css';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { TalentsListPage } from '../../talents/components/TalentsListPage';
import { store } from '../state/store';
import { Test } from '../../talents/components/Test';
import history from './history';

export class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={ store }>
          <AppContainer>
            <Route path="/test" exact component={ Test } />
            <Route path="/talents" exact component={ TalentsListPage } />
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;
