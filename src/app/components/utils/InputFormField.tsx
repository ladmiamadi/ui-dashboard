import React, { FormEvent } from 'react';
import { Label, Input, FormGroup } from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';

interface Props {
  id: string,
  label: string,
  type: InputType,
  value: string,
  className?: string,
  inputClassName?: string,
  handleChange: (value: string) => void,
}

export default class InputFormField extends React.Component<Props> {
  render() {
    return ( 
      <FormGroup>
        <Label className={this.props.className} htmlFor={this.props.id}>{ this.props.label }</Label>
        <Input
          id={this.props.id}
          type={this.props.type}
          value={this.props.value}
          className={this.props.inputClassName}
          onChange={(event: FormEvent<HTMLInputElement>) => this.props.handleChange(event.currentTarget.value)}
        />
      </FormGroup>
    );
  }
}