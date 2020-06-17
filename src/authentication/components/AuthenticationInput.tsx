import React, { Component } from 'react';
import { Input, Label, Row } from 'reactstrap';
import { PropsForInputWithoutFunc } from '../index.d';
import classes from './styles/AuthenticationForm.module.css';

export interface PropsForInput extends PropsForInputWithoutFunc {
  handleOnChange: (id: string, idValue: string) => void,
}

export default class AuthenticationInput extends Component<PropsForInput> {
  render() {
    return (
      <Row className={classes.ColAuthenticationInput}>
        <Label>{ this.props.label }</Label>
        <Input
          onChange={(event) => this.props.handleOnChange(this.props.id, event.target.value)}
          placeholder={this.props.placeholder}
          type={this.props.type}
          value={this.props.value}
        />
      </Row>
    );
  }
}
