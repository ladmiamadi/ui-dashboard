import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../app/state/store';
import { Loader } from '../../app/components/utils/Loader'; // eslint-disable-line
import { UncontrolledAlert } from 'reactstrap';

interface OwnProps {
	form: JSX.Element;
	localToken: string | null;
}

interface Props extends OwnProps {
	token: string | null;
	isVerifiedToken: boolean;
	verifyToken: (token: string) => Promise<void>;
}

// TODO : throw error when token is invalid
interface InvalidTokenError extends Error {}

export class AuthenticationGuard extends React.Component<Props> {
	async componentDidMount() {
		if (this.props.localToken && !this.props.isVerifiedToken) {
			await this.props
				.verifyToken(this.props.localToken)
				.then(() => {
					console.log('Token valid !');
				})
				.catch(() => {
					throw new Error('INVALID TOKEN');
					this.alertRedirection();
					console.log('INVALID TOKEN');
				});
			// try {
			// 	await this.props.verifyToken(this.props.localToken);
			// 	console.log('Token valid !');
			// } catch (error) {
			// 	console.log('Error Token : ', error.message);
			// 	this.alertRedirection();
			// 	// TODO : Redirect to http://hdmnetwork.com
			// 	// Il le fait déjà tout seul, mais il faut rajouter l'alert bootstrap
			// }
		}
	}

	alertRedirection = () => {
		return <UncontrolledAlert color="info">I am an alert and I can be dismissed!</UncontrolledAlert>;
	};

	render() {
		if (this.props.token) {
			return this.props.children;
		}

		if (this.props.localToken && !this.props.isVerifiedToken) {
			return <Loader />;
		}

		return this.props.form;
	}
}

const mapState = (state: RootState, propsFromParent: any | OwnProps) => ({
	token: state.auth.token,
	isVerifiedToken: state.auth.isVerifiedToken,
	form: propsFromParent.form,
	localToken: propsFromParent.localToken || null
});

const mapDispatch = (dispatch: any) => ({ verifyToken: dispatch.auth.verifyToken });

export default connect(mapState, mapDispatch)(AuthenticationGuard);
