import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import AppContainer from './AppContainer';
import TalentFormPage from '../../talents/components/form/TalentFormPage';
import Homepage from './homepage/Homepage';
import CustomNavbar from './navbar/CustomNavbar';
import ModalRegisterUser from '../../registerUser/components/modal/ModalRegisterUser';
import './styles/App.css';


export class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={store} >
          <AppContainer>
            <CustomNavbar />
            <Route path="/" exact component={Homepage} />
            <Route path="/talent" exact component={TalentFormPage} />
            <Route path="/intern/add" exact component={ModalRegisterUser} />
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;
