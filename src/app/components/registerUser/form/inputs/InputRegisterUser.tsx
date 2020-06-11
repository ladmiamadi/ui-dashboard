import React, { Component } from 'react';
import { checkInputInvalidity, checkRegEx } from '../helpers/inputCheck';
import { Col, Input, Label } from 'reactstrap';
import { PropsForInput } from '../../index';
import { Toastify } from '../../../../../helpers/Toastify';

export default class InputRegisterUser extends Component<PropsForInput> {
  setIsFormValid = () => {
    const { id, idValue, listUserUsername, regEx } = this.props;
    let isInputValid = checkRegEx(idValue, regEx);
    if(listUserUsername){
      listUserUsername.map(username => {
        if(username === idValue){
          (new Toastify()).error(idValue + ' already exists in the database');
          isInputValid = false;
        }
        return username;
      });
    }
    this.props.setIsFormValid(id, isInputValid);
  }

  render() {
    const { id, idValue, isInputValid, label, type, updateUserSignUp } = this.props;
    const invalid = checkInputInvalidity(isInputValid);
    return (
      <Col>
        <Label>{ label }</Label>
        <Input
          id={id}
          invalid={invalid}
          type={type}
          valid={isInputValid}
          value={idValue}
          onBlur={this.setIsFormValid}
          onChange={(e) => updateUserSignUp(id, e.target.value)}
        />
      </Col>
    );
  }
}
