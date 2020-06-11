import React, { Component } from 'react';
import { Col, Input, Label } from 'reactstrap';
import { PropsForInput } from '../../index';

export default class InputDateRegisterUser extends Component<PropsForInput> {
  checkInputInvalidity = () => {
    const invalid = (this.props.isInputValid === false && this.props.isInputValid !== undefined);
    return invalid;
  }

  setIsFormValid = () => {
    const checkRegExp = new RegExp(this.props.regEx);
    const isInputValid = checkRegExp.test(this.props.idValue);
    this.props.setIsFormValid(this.props.id, isInputValid);
  }
  
  updateUserSignUp = (value: string) => {
    const payload: string = value;
    this.props.updateUserSignUp(this.props.id, payload);
  }

  render() {
    const { id, idValue, label,  type } = this.props;
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
