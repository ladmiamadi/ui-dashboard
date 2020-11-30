import React, { FormEvent } from 'react';
import { FormGroup, Label } from 'reactstrap';
import Input, { InputType } from 'reactstrap/lib/Input';

interface Props {
  className?: string,
  keyName: string
  label: string,
  required?: boolean,
  rows?: number,
  type: InputType,
  value?: string | number,
  handleChange: (value: string) => void,
}

export class FieldForm extends React.Component<Props> {
  handleChange(value: string) {
    if (this.props.handleChange) {
      this.props.handleChange(value);
    }
  }

  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" htmlFor={this.props.keyName}>
          {this.props.label}{this.props.required && '*'}
        </Label>
        <Input
          className="form-input"
          type={this.props.type}
          id={this.props.keyName}
          rows={this.props.rows}
          locale="fr"
          onChange={(event: FormEvent<HTMLInputElement>) => this.handleChange(event.currentTarget.value)}
          defaultValue={this.props.value}
          required={this.props.required}
        />
      </FormGroup>
    );
  }
}
