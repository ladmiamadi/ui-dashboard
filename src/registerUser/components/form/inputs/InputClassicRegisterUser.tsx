import React, { Component } from 'react';
import { Col, Input, Label } from 'reactstrap';
import { InputState } from '../../../index.d';
import { PropsForInput } from '../../..';

export default class InputClassicRegisterUser extends Component<PropsForInput> {
  render() {
    const { id, idValue, isInputValid, label, regEx, type, updateUserSignUp, setIsFormValid } = this.props;

    return (
      <Col>
        <Label>{ label }</Label>
        <Input
          id={id}
          invalid={isInputValid === InputState.FALSE}
          type={type}
          valid={isInputValid === InputState.TRUE}
          value={idValue}
          onBlur={() => setIsFormValid(id, regEx)}
          onChange={(event) => updateUserSignUp(id, event.target.value)}
        />
      </Col>
    );
  }
}
