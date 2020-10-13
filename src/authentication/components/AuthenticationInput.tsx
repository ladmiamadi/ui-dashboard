import React, { Component } from 'react';
import { PropsForInputWithoutFunc } from '../index.d';
import AuthenticationInputClassic from './AuthenticationInputClassic';
import AuthenticationInputSelect from './AuthenticationInputSelect';

export interface PropsForInput extends PropsForInputWithoutFunc {
  handleOnChange: (field: 'username' | 'email' | 'password', value: string) => void,
}

export default class AuthenticationInput extends Component<PropsForInput> {
  render() {
    if (this.props.options) {
      return (
        <AuthenticationInputSelect
          {...this.props}
        />
      );
    } else {
      return (
        <AuthenticationInputClassic
          {...this.props}
        />
      );
    }
  }
}
