import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { IsFormValid, UserRegister, UserSignUp } from '../../..';
import { Job } from '../../../../app';
import { doubleArrayPropsInput } from '../../../helpers/formRegisterHelper';
import InputRegisterUsers from './inputs/InputRegisterUsers';
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
          doubleArrayOfAllInputs.map((array, index) =>
            <Row
              key={index}
              className={classes.RowFormRegisterUser}>
              {
                array.map((props) =>
                  <InputRegisterUsers
                    key={props.id}
                    {...props}
                  />,
                )
              }
            </Row>,
          )
        }
      </>
    );
  }
}

