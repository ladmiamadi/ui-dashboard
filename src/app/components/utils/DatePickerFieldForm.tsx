import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { FormGroup, Label } from 'reactstrap';

interface Props {
  className?: string,
  label: string,
  keyName: string,
  value?: any,
  locale?: Locale,
  handleChange: (value: Date | null) => void,
}

interface State {
  value?: any,
}

export class DatePickerFieldForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  handleChange(value: Date | null) {
    if (this.props.handleChange) {
      this.props.handleChange(value);
    }
  }

  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" htmlFor={this.props.keyName}>{this.props.label}</Label>
        <ReactDatePicker
          id={this.props.keyName}
          className="form-input form-control"
          selected={this.props.value}
          isClearable
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          locale={this.props.locale}
          onChange={(value) => this.handleChange(value)}
        />
      </FormGroup>
    );
  }
}
