import React, { Component } from 'react';
import { Col, Input, Label } from 'reactstrap';
import { PropsForInput, StateForInput } from './index';
import { Toastify } from '../../../helpers/Toastify';

export default class InputRegisterUser extends Component<PropsForInput, StateForInput> {
  updateUserSignUp = (value: string) => {
    const payload: string = value;
    this.props.updateUserSignUp(this.props.id, payload);
  }

  checkInputValidity = () => {
    let isInputValid;
    const checkRegExp = new RegExp(this.props.regEx);
    isInputValid = checkRegExp.test(this.props.idValue);
    if(this.props.listUserUsername){
      this.props.listUserUsername.map(username => {
        if(username === this.props.idValue){
          (new Toastify()).error(this.props.idValue + ' already exists in the database');
          isInputValid = false;
        }
      });
    }
    this.props.setIsFormValid(this.props.id, isInputValid);
  }

  render() {
    const { id, idValue, type, label } = this.props;
    const invalid = !this.props.isInputValid && this.props.isInputValid !== undefined;
    return (
      <Col>
        <Label>{ label }</Label>
        <Input
          id={id}
          value={idValue}
          type={type}
          valid={this.props.isInputValid}
          invalid={invalid}
          onChange={(e) => this.updateUserSignUp(e.target.value)}
          onBlur={this.checkInputValidity}
        />
      </Col>
    );
  }
}
