import React, { Component } from 'react';
import { Col, Input, Label } from 'reactstrap';
import { InputState } from '../../../index.d';
import { PropsForInput } from './InputRegisterUsers';
import { isUsernameAlreadyExists } from '../../../helpers/formRegisterHelper';

export default class InputClassicRegisterUser extends Component<PropsForInput> {
  setIsFormValid = () => {
    let isInputValid = (new RegExp(this.props.regEx)).test(this.props.idValue);

    if (this.props.id === 'username' && isInputValid) {
      isInputValid = isUsernameAlreadyExists(this.props.idValue, this.props.usernameCollection);
    }
    
    this.props.setIsFormValid(this.props.id, isInputValid);
  }

  render() {
    const { id, idValue, isInputValid, label, type, updateUserSignUp } = this.props;

    return (
      <Col>
        <Label>{ label }</Label>
        <Input
          id={id}
          invalid={isInputValid === InputState.FALSE}
          type={type}
          valid={isInputValid === InputState.TRUE}
          value={idValue}
          onBlur={this.setIsFormValid}
          onChange={(e) => updateUserSignUp(id, e.target.value)}
        />
      </Col>
    );
  }
}
