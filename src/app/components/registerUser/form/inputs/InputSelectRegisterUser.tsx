import React, { Component } from 'react';
import { checkInputInvalidity, checkRegEx } from '../helpers/inputCheck';
import { Col, Input, Label } from 'reactstrap';
import { PropsForInput } from '../../index';

interface PropsForInputSelect extends PropsForInput {
  options: string[],
}

export default class InputSelectRegisterUser extends Component<PropsForInputSelect> {
  setIsFormValid = () => {
    const { id, idValue, regEx } = this.props;
    const isInputValid = checkRegEx(idValue, regEx);
    this.props.setIsFormValid(id, isInputValid);
  }

  render() {
    const { id, idValue, isInputValid, label, type, options, updateUserSignUp } = this.props;
    const invalid = checkInputInvalidity(isInputValid);
    return (
      <Col>
        <Label>{ label }</Label>
        <Input
          id={id}
          invalid={invalid}
          type={type}
          value={idValue}
          valid={isInputValid}
          onBlur={this.setIsFormValid}
          onChange={(e) => updateUserSignUp(id, e.target.value)}
        >
          <option value="none" key="none" hidden>Choisissez une option</option>
          { options.map(optionName => <option key={optionName} value={optionName}>{optionName}</option>) }
        </Input>
      </Col>
    );
  }
}
