import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { FormGroup, Label } from 'reactstrap';

interface Props {
  className?: string,
  keyName: string,
  label: string,
  locale?: Locale,
  required?: boolean,
  value?: Date,
  handleChange: (value: Date | null) => void,
}

export class DatePickerFieldForm extends React.Component<Props> {
  handleChange(value: Date | null) {
    if (this.props.handleChange) {
      this.props.handleChange(value);
    }
  }

  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" htmlFor={this.props.keyName}>
          {this.props.label}{this.props.required && '*'}</Label>
        <ReactDatePicker
          id={this.props.keyName}
          className="form-input form-control"
          selected={this.props.value}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          locale={this.props.locale}
          onChange={(value) => this.handleChange(value)}
          required={this.props.required}
        />
      </FormGroup>
    );
  }
}
