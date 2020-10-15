import React, { FormEvent } from 'react';
import { FormGroup, Label } from 'reactstrap';
import Input, { InputType } from 'reactstrap/lib/Input';

interface Props {
  className?: string,
  label: string,
  keyName: string
  rows?: number,
  type: InputType,
  value?: any,
  handleChange: (value: string) => void,
}

interface State {//
  value?: any,
}

export class FieldForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  handleChange(value: string) {
    if (this.props.handleChange) {
      this.props.handleChange(value);
    }
  }

  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" htmlFor={this.props.keyName}>{ this.props.label }</Label>
        <Input
          //onChange={(event) => this.props.handleOnChange(this.props.keyName, event.target.value)}
          className="form-input"
          type={this.props.type}
          id={this.props.keyName}
          rows={this.props.rows}
          onChange={(event: FormEvent<HTMLInputElement>) => this.handleChange(event.currentTarget.value)}
          // defaultValue={this.state.value}
        />
      </FormGroup>
    );
  }
}
