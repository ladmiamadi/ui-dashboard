import React, { Component } from 'react';
import { PropsForInputWithoutFunc } from '../index.d';
import { Input, Label, Col } from 'reactstrap';
import classes from './styles/AuthenticationForm.module.css';

export interface PropsForInput extends PropsForInputWithoutFunc {
  handleOnChange: (id: string, idValue: string) => void,
}

export default class AuthenticationInput extends Component<PropsForInput> {
  render() {
    return (
      <Col className={classes.ColAuthenticationInput}>
        <Label>{ this.props.label }</Label>
        <Input
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={(event) => this.props.handleOnChange(this.props.id, event.target.value)}
        />
      </Col>
    );
  }
}
