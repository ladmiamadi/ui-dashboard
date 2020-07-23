import React, { FormEvent } from 'react';
import { Label, Input } from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';

interface Props {
  id: string,
  label: string,
  type: InputType,
  value: string,
  className?: ClassName,
  handleChange: (value: string) => void,
}

export interface ClassName {
  label?: string,
  input: string,
}

export default class InputFormField extends React.Component<Props> {
  render() {
    return (
      <>
        <Label className={this.props.className?.label} htmlFor={this.props.id}>{ this.props.label }</Label>
        <Input
          id={this.props.id}
          type={this.props.type}
          value={this.props.value}
          className={this.props.className?.input}
          onChange={(event: FormEvent<HTMLInputElement>) => this.props.handleChange(event.currentTarget.value)}
        />
      </>
    );
  }
}
