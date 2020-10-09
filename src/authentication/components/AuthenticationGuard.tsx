import React from 'react';
import { connect } from 'react-redux';
import { Loader } from '../../app/components/utils/Loader'; // eslint-disable-line
import { RootState } from '../../app/state/store';

interface OwnProps {
  form: JSX.Element,
  localToken: string | null,
}

interface Props extends OwnProps {
  token: string | null,
  isVerifiedToken: boolean,
  verifyToken: (token: string) => Promise<void>,
}

export class AuthenticationGuard extends React.Component<Props> {
  async componentDidMount() {
    if (this.props.localToken && !this.props.isVerifiedToken) {
      await this.props.verifyToken(this.props.localToken);
    }
  }

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
  localToken: propsFromParent.localToken || null,
});

const mapDispatch = (dispatch: any) => ({ verifyToken: dispatch.auth.verifyToken });

export default connect(mapState, mapDispatch)(AuthenticationGuard);
