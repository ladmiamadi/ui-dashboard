import React, { Component } from 'react';
import { Col, Input, Label } from 'reactstrap';
import { PropsForInput } from '../../index';

interface PropsForInputSelect extends PropsForInput {
  options: string[],
}

export default class InputSelectRegisterUser extends Component<PropsForInputSelect> {
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
    const { id, idValue, type, label, options } = this.props;
    const invalid = this.checkInputInvalidity();
    return (
      <Col>
        <Label>{ label }</Label>
        <Input
          id={id}
          invalid={invalid}
          type={type}
          value={idValue}
          valid={this.props.isInputValid}
          onBlur={this.setIsFormValid}
          onChange={(e) => this.updateUserSignUp(e.target.value)}
        >
          <option value="none" key="none" hidden>Choisissez une option</option>
          { options.map(optionName => <option key={optionName} value={optionName}>{optionName}</option>) }
        </Input>
      </Col>
    );
  }
}
