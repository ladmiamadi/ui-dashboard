import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState, RootDispatch } from '../../app/state/store';
import { Spinner } from 'reactstrap';

interface OwnProps {
  children: React.ReactNode,
  localToken: string | null,
}

interface Props extends OwnProps {
  isVerifiedToken: boolean,
  token: string | null,
  verifyToken: (token: string) => Promise<void>,
}

export class AuthenticationGuard extends React.Component<Props> {
  async componentDidMount() {

    if (this.props.localToken && !this.props.isVerifiedToken) {
      await this.props.verifyToken(this.props.localToken);
      //setTimeout(this.redirectToHomePage, 5000);
    }
  }

  /*  async componentDidUpdate() {
    if (this.props.localToken && !this.props.isVerifiedToken) {
      try {
        await this.props.verifyToken(this.props.localToken);
      } catch (error) {
        setTimeout(this.redirectToHomePage, 5000);
      }
    }
  }*/

  /*  redirectToHomePage = () => {
    return <Redirect to="/"/>;
  }*/

  render() {
    console.log(this.props.token);
    console.log(this.props.localToken);

    if (this.props.localToken && !this.props.isVerifiedToken) {
      console.log('spinner');
      return <Spinner />;
    }

    if (this.props.localToken && !this.props.token) {
      console.log('redirect');
      //this.redirectToHomePage();
      return <Redirect to="/"/>;
    }

    if (!this.props.token) {
      return <div>you are not logged</div>;
    }
    /*    if (this.props.token) {
      return this.props.children;
    }*/

    console.log('yes');
    //setTimeout(this.redirectToHomePage, 5000);
    console.log('null');
    return this.props.children;
  }
}

const mapState = (state: RootState) => ({
  isVerifiedToken: state.auth.isVerifiedToken,
  token: state.auth.token,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  verifyToken: dispatch.auth.verifyToken ,
});

export default connect(mapState, mapDispatch)(AuthenticationGuard);
