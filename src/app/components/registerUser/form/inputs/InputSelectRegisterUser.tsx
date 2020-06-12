import React, { Component } from 'react';
import { checkRegEx } from '../helpers/inputCheck';
import { Col, Input, Label } from 'reactstrap';
import { PropsForInput } from './InputRegisterUser';
import { InputState } from '../../index.d';

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
        >
          <option value="none" key="none" hidden>Choisissez une option</option>
          { options.map(optionName => <option key={optionName} value={optionName}>{optionName}</option>) }
        </Input>
      </Col>
    );
  }
}
