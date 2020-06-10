import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './AppContainer';
import CustomNavbar from './navbar/CustomNavbar';
import Homepage from './homepage/Homepage';
import { Provider } from 'react-redux';
import TalentFormPage from '../../talents/components/form/TalentFormPage';
import { TalentsListPage } from '../../talents/components/TalentsListPage';
import { store } from '../state/store';
import { Test } from '../../talents/components/Test';
import history from './history';
import './styles/App.css';

export class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={ store }>
          <AppContainer>
            <CustomNavbar />
            <Route path="/" exact component={Homepage} />
            <Route path="/talent" exact component={TalentFormPage} />
            <Route path="/talents" exact component= {TalentsListPage} />
            <Route path="/test" exact component={ Test } />
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;
