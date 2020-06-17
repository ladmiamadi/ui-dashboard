import React, { Component } from 'react';
import InputClassicRegisterUser from './InputClassicRegisterUser';
import InputSelectRegisterUser from './InputSelectRegisterUser';
import { ObjectPropsOfInput } from '../helpers/formRegisterHelpers';

export interface PropsForInput extends ObjectPropsOfInput {
  updateUserSignUp: (id: string, idValue: string) => void,
  setIsFormValid: (id: string, isInputValid: boolean) => void,
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
