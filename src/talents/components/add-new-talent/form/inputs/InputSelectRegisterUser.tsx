import React, { Component } from 'react';
import { Col, Input, Label } from 'reactstrap';
import { InputState, PropsForInput } from '../../../../index.d';

export default class InputSelectRegisterUser extends Component<PropsForInput> {
  render() {
    const { id, idValue, isInputValid, label, regEx, type, options, updateUserSignUp, setIsFormValid } = this.props;

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
