import React, { Component } from 'react';
import { PropsForInput } from './AuthenticationInput';
import { Input, Label, Col } from 'reactstrap';
import classes from './styles/AuthenticationForm.module.css';

export default class AuthenticationInputSelect extends Component<PropsForInput> {
  render() {
    return (
      <Col className={classes.ColAuthenticationInput}>
        <Label>{ this.props.label }</Label>
        <Input
          type={this.props.type}
          onChange={(event) => this.props.handleOnChange(this.props.id, event.target.value)}
          name={this.props.id}
          id={this.props.id}
        >
          <option value="none" key="none" hidden>Choose a username</option>
          {
            this.props.options && this.props.options.map((option, index) => (<option key={index}>{ option }</option>))
          }
        </Input>
      </Col>
    );
  }
}
