import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { UserSignUp, IsFormValid } from '../../state/models/userSignUp';
import { doubleArrayObjectOfPropsInput } from '../../helpers/formRegisterHelper';
import InputRegisterUsers from './inputs/InputRegisterUsers';
import classes from '../styles/FormRegisterUser.module.css';
import { Job } from '../../../app';

interface Props {
  isFormValid: IsFormValid,
  jobCollection: Job[],
  usernameCollection: string[],
  userSignUp: UserSignUp,
  updateUserSignUp: (id: string, idValue: string) => void,
  setIsFormValid: (id: string, isInputValid: boolean) => void,
}

export default class FormRegisterUser extends Component<Props> {
  render() {
    const { usernameCollection, userSignUp, isFormValid, jobCollection } = this.props;
    const doubleArrayOfAllInputs = doubleArrayObjectOfPropsInput(isFormValid, usernameCollection, userSignUp, jobCollection);

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
                    updateUserSignUp={this.props.updateUserSignUp}
                    setIsFormValid={this.props.setIsFormValid} 
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

