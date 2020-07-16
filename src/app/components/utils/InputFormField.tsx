import React, { FormEvent } from 'react';
import { Label, Input } from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';

interface Props {
  className: ClassName,
  id: string,
  invalid?: boolean,
  label: string,
  type: InputType,
  value: string,
  handleChange: (value: string) => void,
}

export interface  ClassName {
  label: string,
  input: string,
}

export default class InputFormField extends React.Component<Props> {
  render() {
    return ( 
      <>
        <Label className={this.props.className.label} htmlFor={this.props.id}>{ this.props.label }</Label>
        <Input
          id={this.props.id}
          invalid={this.props.invalid}
          type={this.props.type}
          value={this.props.value}
          className={this.props.className.input}
          onChange={(event: FormEvent<HTMLInputElement>) => this.props.handleChange(event.currentTarget.value)}
        />
      </>
    );
  }
}