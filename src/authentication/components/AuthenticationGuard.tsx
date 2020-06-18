import React from 'react';
import { connect } from 'react-redux';
import { RootState, RootDispatch } from '../../app/state/store';
import { Spinner } from 'reactstrap';

interface OwnProps {
  children: React.ReactNode,
  form: React.ReactNode,
  localToken: string | null,
}

interface Props extends OwnProps {
  isVerifiedToken: boolean,
  token: string | null,
  verifyToken: (token: string) => Promise<void>,
}

export class AuthenticationGuard extends React.Component<Props> {
  componentDidMount() {
    if (this.props.localToken && !this.props.isVerifiedToken) {
      this.props.verifyToken(this.props.localToken);
    }
  }

  render() {
    if (this.props.token) {
      return this.props.children;
    }

    if (this.props.localToken && !this.props.isVerifiedToken) {
      return <Spinner />;
    }

    return this.props.form;
  }
}

const mapState = (state: RootState) => ({
  isVerifiedToken: state.auth.isVerifiedToken,
  token: state.auth.token,
});

const mapDispatch = (dispatch: RootDispatch) => ({ verifyToken: dispatch.auth.verifyToken });

export default connect(mapState, mapDispatch)(AuthenticationGuard);
