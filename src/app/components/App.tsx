import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import RegisterUser from '../../talents/components/add-new-talent/modal/RegisterUser';
import TalentFormPage from '../../talents/components/form/TalentFormPage';
import ProfileEditValidation from '../../talents/components/profileValidation/ProfileEditValidation';
import { TalentsListPage } from '../../talents/components/TalentsListPage';
import TimelineContainer from '../../timeline/components/TimelineContainer';
import history from '../helpers/history';
import { store } from '../state/store';
import AppContainer from './AppContainer';
import Homepage from './homepage/Homepage';
import CustomNavbar from './navbar/CustomNavbar';
import './styles/App.css';

export class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <AppContainer>
            <CustomNavbar />
            <Route path="/" exact component={Homepage} />
            <Route path="/talent" exact component={TalentFormPage} />
            <Route path="/talents" exact component={TalentsListPage} />
            <Route path="/editprofile" exact component={ProfileEditValidation} />
            <Route path="/" component={RegisterUser} history={history} />
            <Route path="/timeline" exact component={TimelineContainer} />
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;