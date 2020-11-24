import { Component, default as React } from 'react';
import { Col, Input, Label } from 'reactstrap';
import { InputState, PropsForInput } from '../../../index.d';

export default class InputRegisterUsers extends Component<PropsForInput> {
  render() {
    const { id, idValue, isInputValid, label, regEx, type, options, updateUserSignUp, setIsFormValid } = this.props;

    return (
      <Col>
        <Label>{this.props.required && '*'}{label}</Label>
        <Input
          id={id}
          invalid={isInputValid === InputState.FALSE}
          type={type}
          valid={isInputValid === InputState.TRUE}
          value={idValue}
          onBlur={() => setIsFormValid(id, regEx)}
          onChange={(event) => updateUserSignUp(id, event.target.value)}
          required={this.props.required}
        >
          {options &&
            <>
              <option value="none" key="none" hidden>Choisissez une option</option>
              {options.map(optionName =>
                <option key={optionName} value={optionName}>{optionName}</option>,
              )}
            </>
          }
        </Input>
      </Col>
    );
  }
}
