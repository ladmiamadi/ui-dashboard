import React from 'react';
import { Route, Router } from 'react-router-dom';
import ProfileEditValidation from '../../talents/components/profileValidation/ProfileEditValidation';
import AppContainer from './AppContainer';
import TalentFormPage from '../../talents/components/form/TalentFormPage';
import Homepage from './homepage/Homepage';
import CustomNavbar from './navbar/CustomNavbar';
import { Provider } from 'react-redux';
import { TalentsListPage } from '../../talents/components/TalentsListPage';
import { store } from '../state/store';
import RegisterUser from '../../talents/components/add-new-talent/modal/RegisterUser';
import history from '../helpers/history';
<<<<<<< HEAD
import AuthenticationForm from '../../authentication/components/AuthenticationForm';
import TimelineContainer from '../../timeline/components/TimelineContainer';
=======
>>>>>>> d9003bf0be1a828561322ce8368efcfe45bd6468
import './styles/App.css';

export class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <AppContainer>
<<<<<<< HEAD
            <AuthenticationGuard 
              form={<AuthenticationForm />}
              localToken={localStorage.getItem('hdm:admin:auth-token')}
            >
              <CustomNavbar/>
              <Route path="/" exact component={Homepage} />
              <Route path="/talent" exact component={TalentFormPage} />
              <Route path="/talents" exact component= {TalentsListPage} />
              <Route path="/editprofile" exact component={ProfileEditValidation} />
              <Route path="/intern" exact component={RegisterUser} />
              <Route path="/timeline" exact component={TimelineContainer} />
            </AuthenticationGuard>
          </AppContainer>                 
=======
            <CustomNavbar/>
            <Route path="/" exact component={Homepage} />
            <Route path="/talent" exact component={TalentFormPage} />
            <Route path="/talents" exact component= {TalentsListPage} />
            <Route path="/editprofile" exact component={ProfileEditValidation} />
            <Route path="/intern" exact component={RegisterUser} />
          </AppContainer>
>>>>>>> d9003bf0be1a828561322ce8368efcfe45bd6468
        </Provider>
      </Router>
    );
  }
}

export default App;