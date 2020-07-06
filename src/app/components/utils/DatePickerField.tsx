import React, { FormEvent } from 'react';
import { Label, Input } from 'reactstrap';

interface Props {
  id: string,
  label: string,
  handleChange: (value: string) => void,
}

export default class DatePickerField extends React.Component<Props> {
  render() {
    return ( 
      <>
        <Label htmlFor={this.props.id}>{ this.props.label }</Label>
        <Input
          id={this.props.id}
          type="date"
          onChange={(event: FormEvent<HTMLInputElement>) => this.props.handleChange(event.currentTarget.value)}
        />
      </>
    );
  }
}