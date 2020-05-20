import React from 'react';
import './styles/App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import Homepage from './homepage/Homepage';
import CustomNavbar from './navbar/CustomNavbar';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={ store } >
          <AppContainer>
            <CustomNavbar />
            <Route path="/" exact component={ Homepage } />
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}

export default App;
