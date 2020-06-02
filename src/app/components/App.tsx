import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import AppContainer from './AppContainer';
import TalentFormPage from '../../talents/components/form/TalentFormPage';
import AuthenticationForm from '../../authentication/components/AuthenticationForm';
import AuthenticationGuard from '../../authentication/components/AuthenticationGuard';
import Homepage from './homepage/Homepage';
import CustomNavbar from './navbar/CustomNavbar';
import './styles/App.css';

export class App extends React.Component {
	render() {
		return (
			<Router>
				<Provider store={store}>
					<AppContainer>
						<AuthenticationGuard
							form={<AuthenticationForm />}
							localToken={localStorage.getItem('hdm:admin:auth-token')}
						>
							<CustomNavbar />
							<Route path="/" exact component={Homepage} />
							<Route path="/talent" exact component={TalentFormPage} />
						</AuthenticationGuard>
					</AppContainer>
				</Provider>
			</Router>
		);
	}
}

export default App;
