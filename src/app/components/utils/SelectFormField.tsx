import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { OptionList, OptionValue } from './OptionList';

interface Props {
  className?: string,
  keyName: string,
  label: string,
  options: string[] | OptionValue[],
  required?: boolean,
  size?: number,
  value: string,
  handleChange: (property: string, value: string) => void,
  updateModel?: (value: string, property: string) => void,
}

export class SelectFormField extends React.Component<Props> {
  updateModelOnChange = (value: string, property: string) => {
    if (this.props.updateModel) {
      this.props.updateModel(value, property);
    }
  }

  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" htmlFor={this.props.label}>{this.props.label}{this.props.required && '*'}</Label>
        <Input
          onChange={event => this.props.handleChange(this.props.keyName, event.target.value)}
          className="form-input"
          type="select"
          id={this.props.label}
          value={this.props.value}
          required={this.props.required}
          size={this.props.size}
        >
          <option>Aucun</option>
          <OptionList options={this.props.options} />
        </Input>
      </FormGroup>
    );
  }
}
