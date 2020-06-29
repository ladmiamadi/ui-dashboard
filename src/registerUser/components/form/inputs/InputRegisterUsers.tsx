import React, { Component } from 'react';
import InputClassicRegisterUser from './InputClassicRegisterUser';
import InputSelectRegisterUser from './InputSelectRegisterUser';
import { PropsForInput } from '../../../index.d';

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
