import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Input, { InputType } from 'reactstrap/lib/Input';

interface Props {
  rows?: number,
  label: string,
  keyName: string,
  className?: string,
  type: InputType
}

export class FieldForm extends React.Component<Props> {
  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" for={this.props.keyName}>{ this.props.label }</Label>
        <Input
          className="form-input"
          type={this.props.type}
          id={this.props.keyName}
          rows={this.props.rows}
        />
      </FormGroup>
    );
  }
}
