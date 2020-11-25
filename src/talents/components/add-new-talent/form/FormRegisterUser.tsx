import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { IsFormValid, UserRegister, UserSignUp } from '../../..';
import { Job } from '../../../../app';
import { doubleArrayPropsInput } from '../../../helpers/FormRegisterHelper';
import InputRegisterUsers from './InputRegisterUsers';
import classes from '../styles/FormRegisterUser.module.css';
export interface Props {
  isFormValid: IsFormValid,
  jobCollection: Job[],
  usernameCollection: string[],
  userSignUp: UserSignUp,
  setIsFormValid: <T>(property: keyof UserRegister<T>, regEx: string) => void,
  updateUserSignUp: <T>(property: keyof UserRegister<T>, Value: string) => void,
}

export default class FormRegisterUser extends Component<Props> {
  render() {
    const doubleArrayOfAllInputs = doubleArrayPropsInput(this.props);

    return (
      <>
        {
          doubleArrayOfAllInputs.map((inputsPropsRow, index) =>
            <Row
              key={index}
              className={classes.RowFormRegisterUser}>
              {
                inputsPropsRow.map((inputProps) =>
                  <>
                    {inputProps.isSectionTitle && <h4 className="register-form-title">{inputProps.label}</h4>}
                    {!inputProps.isSectionTitle && <InputRegisterUsers key={inputProps.id} {...inputProps} />}
                  </>,
                )
              },
            </Row>,
          )
        }
      </>
    );
  }
}

