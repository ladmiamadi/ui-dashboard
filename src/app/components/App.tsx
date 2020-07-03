import React from 'react';
import { Route, Router } from 'react-router-dom';
import ProfileEditValidation from '../../talents/components/profileValidation/ProfileEditValidation';
import AppContainer from './AppContainer';
import AuthenticationForm from '../../authentication/components/AuthenticationForm';
import AuthenticationGuard from '../../authentication/components/AuthenticationGuard';
import CustomNavbar from './navbar/CustomNavbar';
import Homepage from './homepage/Homepage';
import { Provider } from 'react-redux';
import TalentFormPage from '../../talents/components/form/TalentFormPage';
import { TalentsListPage } from '../../talents/components/TalentsListPage';
import { store } from '../state/store';
import ModalRegisterUser from '../../talents/components/add-new-talent/modal/ModalRegisterUser';
import './styles/App.css';
import history from '../helpers/history';

export class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <AppContainer>
            <AuthenticationGuard
              form={<AuthenticationForm />}
              localToken={localStorage.getItem('hdm:admin:auth-token')}
            >
              <CustomNavbar />
              <Route path="/" exact component={Homepage} />
              <Route path="/talent" exact component={TalentFormPage} />
              <Route path="/talents" exact component= {TalentsListPage} />
              <Route path="/editprofile" exact component={ProfileEditValidation} />
              <Route path="/intern" exact component={ModalRegisterUser} />
            </AuthenticationGuard>
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;
