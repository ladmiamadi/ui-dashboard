import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Input, { InputType } from 'reactstrap/lib/Input';

interface Props {
  rows?: number,
  label: string,
  keyName: string,
  className?: string,
  type: InputType,
  value?: any,
  handleChange(value: string): void,
}

interface State {
  value?: string,
}

export class FieldForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  handleChange(value: string ) {
    if (this.props.handleChange) {
      this.props.handleChange(value);
    }
  }

  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" htmlFor={this.props.keyName}>{ this.props.label }</Label>
        <Input
          className="form-input"
          type={this.props.type}
          id={this.props.keyName}
          rows={this.props.rows}
          onChange={(event) => this.handleChange(event.target.value)}
          defaultValue={this.state.value}
        />
      </FormGroup>
    );
  }
}
