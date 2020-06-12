import React, { Component } from 'react';
import { checkRegEx } from '../helpers/inputCheck';
import { Col, Input, Label } from 'reactstrap';
import { Toastify } from '../../../../../helpers/Toastify';
import { InputState } from '../../index.d';
import { InputType } from 'reactstrap/lib/Input';

export interface PropsForInput {
  id: string,
  idValue: string,
  isInputValid: InputState,
  type: InputType,
  label: string,
  regEx: string,
  listUserUsername?: string[],
  updateUserSignUp: (id: string, value: string) => void,
  setIsFormValid: (id: string, payload: boolean) => void,
}

export default class InputRegisterUser extends Component<PropsForInput> {
  setIsFormValid = () => {
    let isInputValid = checkRegEx(this.props.idValue, this.props.regEx);

    if (this.props.listUserUsername) {
      this.props.listUserUsername.map(username => {
        if (username === this.props.idValue) {
          (new Toastify()).error(this.props.idValue + ' already exists in the database');
          
          isInputValid = false;
        }

        return username;
      });
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
