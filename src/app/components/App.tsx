import './styles/App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import React from 'react';
import { TalentsListPage } from '../../talents/components/TalentsListPage';
import { store } from '../state/store';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={ store }>
          <AppContainer>
            <Route path="/talents" exact component= { TalentsListPage } />
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;
