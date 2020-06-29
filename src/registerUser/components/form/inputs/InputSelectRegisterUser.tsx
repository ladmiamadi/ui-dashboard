import React, { Component } from 'react';
import { Col, Input, Label } from 'reactstrap';
import { InputState } from '../../../index.d';
import { PropsForInput } from '../../..';

export default class InputSelectRegisterUser extends Component<PropsForInput> {
  setIsFormValid = () => {
    const { id, idValue, regEx } = this.props;
    const isInputValid = new RegExp(regEx).test(idValue);

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
          onChange={(event) => updateUserSignUp(id, event.target.value)}
        >
          <option value="none" key="none" hidden>Choisissez une option</option>

          { options && options.map(optionName => 
            <option key={optionName} value={optionName}>{ optionName }</option>,
          )}
          
        </Input>
      </Col>
    );
  }
}
