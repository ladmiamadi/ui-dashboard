import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { UserSignUp, IsFormValid } from '../..';
import { doubleArrayPropsInput } from '../../helpers/formRegisterHelper';
import InputRegisterUsers from './inputs/InputRegisterUsers';
import { Job } from '../../../app';
import classes from '../styles/FormRegisterUser.module.css';

export interface Props {
  isFormValid: IsFormValid,
  jobCollection: Job[],
  usernameCollection: string[],
  userSignUp: UserSignUp,
  updateUserSignUp: (property: string, Value: string) => void,
  setIsFormValid: (property: string, isInputValid: boolean) => void,
}

export class FormRegisterUser extends Component<Props> {
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

