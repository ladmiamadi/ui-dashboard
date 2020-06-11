import React, { Component } from 'react';
import { Col, Input, Label } from 'reactstrap';
import { PropsForInput } from '../../index';
import { Toastify } from '../../../../../helpers/Toastify';

export default class InputRegisterUser extends Component<PropsForInput> {
  checkInputInvalidity = () => {
    const invalid = (this.props.isInputValid === false && this.props.isInputValid !== undefined);
    return invalid;
  }

  setIsFormValid = () => {
    let isInputValid;
    const checkRegExp = new RegExp(this.props.regEx);
    isInputValid = checkRegExp.test(this.props.idValue);
    if(this.props.listUserUsername){
      this.props.listUserUsername.map(username => {
        if(username === this.props.idValue){
          (new Toastify()).error(this.props.idValue + ' already exists in the database');
          isInputValid = false;
        }
        return username;
      });
    }
    this.props.setIsFormValid(this.props.id, isInputValid);
  }
  
  updateUserSignUp = (value: string) => {
    const payload: string = value;
    this.props.updateUserSignUp(this.props.id, payload);
  }

  render() {
    const { id, idValue, type, label } = this.props;
    const invalid = this.checkInputInvalidity();
    return (
      <Col>
        <Label>{ label }</Label>
        <Input
          id={id}
          invalid={invalid}
          type={type}
          valid={this.props.isInputValid}
          value={idValue}
          onBlur={this.setIsFormValid}
          onChange={(e) => this.updateUserSignUp(e.target.value)}
        />
      </Col>
    );
  }
}
