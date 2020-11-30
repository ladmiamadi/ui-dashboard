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
import TimelineContainer from '../../timeline/components/TimelineContainer';
import './styles/App.css';

export class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <AppContainer>
            <CustomNavbar/>
            <Route path="/" exact component={Homepage} />
            <Route path="/talent" exact component={TalentFormPage} />
            <Route path="/talents" exact component= {TalentsListPage} />
            <Route path="/editprofile" exact component={ProfileEditValidation} />
            <Route path="/intern" exact component={RegisterUser} />
            <Route path="/timeline" exact component={TimelineContainer} />
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;