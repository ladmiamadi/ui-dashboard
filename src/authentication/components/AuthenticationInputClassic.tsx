import React, { Component } from 'react';
import { Input, Label, Col } from 'reactstrap';
import { PropsForInput } from './AuthenticationInput';
import classes from './styles/AuthenticationForm.module.css';

export default class AuthenticationInputClassic extends Component<PropsForInput> {
  render() {
    return (
      <Col className={classes.ColAuthenticationInput}>
        <Label>{ this.props.label }</Label>
        <Input
          type={this.props.type}
          defaultValue={this.props.defaultValue}
          placeholder={this.props.placeholder}
          onChange={(event) => this.props.handleOnChange(this.props.id, event.target.value)}
        />
      </Col>
    );
  }
}
