import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './AppContainer';
import TalentFormPage from '../../talents/components/form/TalentFormPage';
import AuthenticationGuard from '../../authentication/components/AuthenticationGuard';
import Homepage from './homepage/Homepage';
import CustomNavbar from './navbar/CustomNavbar';
import { Provider } from 'react-redux';
import { TalentsListPage } from '../../talents/components/TalentsListPage';
import { store } from '../state/store';
import './styles/App.css';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <AuthenticationGuard localToken={localStorage.getItem('hdm-network:admin:auth-token')}>
            <AppContainer>
              <CustomNavbar />
              <Route path="/" exact component={Homepage} />
              <Route path="/talent" exact component={TalentFormPage} />
              <Route path="/talents" exact component= {TalentsListPage} />
            </AppContainer>
          </AuthenticationGuard>
        </Provider>
      </Router>
    );
  }
}

export default App;
