import React from 'react';
import { connect } from 'react-redux';
import { RootState, RootDispatch } from '../../app/state/store';
import { toast } from 'react-toastify';

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
    try {
      await this.props.verifyToken(this.props.localToken ? this.props.localToken : '');
    } catch (error) {
      toast.error(<div>You are no longer logged in the application. You will be redirected in 5 seconds.
        <a href="https://www.hdmnetwork.com"> Click here to go back.</a> </div>);
      setTimeout(() => {
        /*you should comment next line to put the token while we don't have the authentication form
        (we don't have time in 5 seconds) and you can uncomment after to test the redirection when
        the token is incorrect or you can put more time for the timeout */
        document.location.href = 'https://www.hdmnetwork.com';
      }, 5000);
    }
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.token !== prevProps.token) {
      try {
        await this.props.verifyToken(this.props.localToken ? this.props.localToken : '');
      } catch (error) {
        toast.error(<div>You are no longer logged in the application. You will be redirected in 5 seconds.
          <a href="https://www.hdmnetwork.com"> Click here to go back.</a> </div>);
        setTimeout(() => {
          /*you should comment next line to put the token while we don't have the authentication form
          (we don't have time in 5 seconds) and you can uncomment after to test the redirection when
          the token is incorrect or you can put more time for the timeout */
          document.location.href = 'https://www.hdmnetwork.com';
        }, 15000);
      }
    }
  }

  render() {
    if (this.props.isVerifiedToken) {
      return this.props.children;
    }

    return <div></div>;
  }
}

const mapState = (state: RootState) => ({
  isVerifiedToken: state.auth.isVerifiedToken,
  token: state.auth.token,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  verifyToken: dispatch.auth.verifyToken,
});

export default connect(mapState, mapDispatch)(AuthenticationGuard);
