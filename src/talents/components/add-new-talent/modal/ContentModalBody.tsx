import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import {
  UserSignUp,
  UserRegister,
  FormValidPayload,
  UserSignUpPayload,
  InputState,
  IsFormValid } from '../../../index.d';
import { isUsernameAlreadyExists } from '../../../helpers/formRegisterHelper';
import { RootState, RootDispatch } from '../../../../app/state/store';
import FormRegisterUser from '../form/FormRegisterUser';
import { Job } from '../../../../app';
import classes from '../styles/FormRegisterUser.module.css';

interface Props {
  isFormValid: IsFormValid,
  isJobsFetching: boolean,
  isRequesting: boolean,
  jobCollection: Job[],
  usernameCollection: string[],
  userSignUp: UserSignUp,
  setIsFormValid: (payload: FormValidPayload) => void,
  updateUserSignUp: (payload: UserSignUpPayload) => void,
}

export class ContentModalBody extends React.Component<Props> {
  updateUserSignUp = <T, >(property: keyof UserRegister<T>, value: string) => {
    const payload: UserSignUpPayload = {
      property,
      value,
    };

    this.props.updateUserSignUp(payload);
  }

  setIsFormValid = <T, >(property: keyof UserRegister<T>, regEx: string) => {
    let checkValue = (new RegExp(regEx)).test(this.props.userSignUp[property]);

    if (property === 'username' && checkValue) {
      checkValue = isUsernameAlreadyExists(this.props.userSignUp[property], this.props.usernameCollection);
    }

    const isInputValid = checkValue ? InputState.TRUE : InputState.FALSE;
    const payload: FormValidPayload = {
      property,
      isInputValid,
    };

    this.props.setIsFormValid(payload);
  }

  render() {
    return (
      <>
        {
          this.props.isRequesting || this.props.isJobsFetching ?
            (
              <div className={classes.containerSpinner}>
                <Spinner color="success" type="grow" />
              </div>
            ) :
            (
              <FormRegisterUser
                isFormValid={this.props.isFormValid}
                jobCollection={this.props.jobCollection}
                usernameCollection={this.props.usernameCollection}
                userSignUp={this.props.userSignUp}
                updateUserSignUp={this.updateUserSignUp}
                setIsFormValid={this.setIsFormValid}
              />
            )
        }
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  isFormValid:state.userSignUp.isFormValid,
  isJobsFetching: state.userSignUp.isJobsFetching,
  isRequesting: state.userSignUp.isRequesting,
  jobCollection: state.userSignUp.jobCollection,
  usernameCollection: state.userSignUp.usernameCollection,
  userSignUp: state.userSignUp.userSignUp,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setIsFormValid: dispatch.userSignUp.setIsFormValid,
  updateUserSignUp: dispatch.userSignUp.updateUserSignUp,
});

export default connect(mapState, mapDispatch)(ContentModalBody);
