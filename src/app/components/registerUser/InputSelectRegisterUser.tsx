import React, { Component } from 'react';
import { Col, Input, Label } from 'reactstrap';
import { PropsForInput, StateForInput } from './index';

interface PropsForSelect extends PropsForInput {
  options: string[],
}

export default class InputSelectRegisterUser extends Component<PropsForSelect, StateForInput> {
  updateUserSignUp = (value: string) => {
    const payload: string = value;
    this.props.updateUserSignUp(this.props.id, payload);
  }

  checkInputValidity = () => {
    const checkRegExp = new RegExp(this.props.regEx);
    const isInputValid = checkRegExp.test(this.props.idValue);
    this.props.setIsFormValid(this.props.id, isInputValid);
  }

  render() {
    const { id, idValue, type, label, options } = this.props;
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
        >
          <option value="none" key="none" hidden>Choisissez une option</option>
          { options.map(optionName => <option key={optionName} value={optionName}>{optionName}</option>) }
        </Input>
      </Col>
    );
  }
}
