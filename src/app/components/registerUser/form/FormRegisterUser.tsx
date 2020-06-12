import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { UserSignUp, IsFormValid } from '../../../state/models/userSignUp';
import { doubleArrayObjectOfPropsInput } from './helpers/formRegisterHelpers';
import InputRegisterUsers from './inputs/InputRegisterUsers';
import classes from '../../styles/FormRegisterUser.module.css';

interface Props {
  isFormValid: IsFormValid,
  listOfAllUsernameOfUsers: string[],
  userSignUp: UserSignUp,
  updateUserSignUp: (id: string, payload: string) => void,
  setIsFormValid: (id: string, payload: boolean) => void,
}

export default class FormRegisterUser extends Component<Props> {
  render() {
    const { listOfAllUsernameOfUsers, userSignUp, isFormValid } = this.props;

    const doubleArrayOfAllInputs = doubleArrayObjectOfPropsInput(isFormValid, listOfAllUsernameOfUsers, userSignUp);

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

