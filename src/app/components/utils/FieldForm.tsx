import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Input, { InputType } from 'reactstrap/lib/Input';

interface Props {
  className?: string,
  label: string,
  keyName: string,
  rows?: number,
  type: InputType,
  value: string,
  handleOnChange: (property: string, value: string) => void,
}

export class FieldForm extends React.Component<Props> {
  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" for={this.props.keyName}>{ this.props.label }</Label>
        <Input
          onChange={(event) => this.props.handleOnChange(this.props.keyName, event.target.value)}
          className="form-input"
          type={this.props.type}
          id={this.props.keyName}
          rows={this.props.rows}
          value={this.props.value}
        />
      </FormGroup>
    );
  }
}
