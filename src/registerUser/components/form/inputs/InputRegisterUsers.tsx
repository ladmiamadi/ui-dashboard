import React, { Component } from 'react';
import InputClassicRegisterUser from './InputClassicRegisterUser';
import InputSelectRegisterUser from './InputSelectRegisterUser';
import { ObjectPropsOfInput } from '../../../index.d';

export interface PropsForInput extends ObjectPropsOfInput {
  updateUserSignUp: (property: string, idValue: string) => void,
  setIsFormValid: (property: string, isInputValid: boolean) => void,
}

export default class InputRegisterUsers extends Component<PropsForInput> {
  render() {
    if (this.props.options) {
      return (
        <InputSelectRegisterUser
          {...this.props}
        />
      );
    } else {
      return (
        <InputClassicRegisterUser
          {...this.props}
        />
      );
    }
  }
}
