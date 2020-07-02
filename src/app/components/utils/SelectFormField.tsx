import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { OptionList } from './OptionList';
import React from 'react';

interface Props {
  options: string[],
  label: string,
  keyName: string,
  className?: string,
  value: string,
  handleChange: (property: string, value: string) => void,
  updateModel?: (value: string, property: string) => void,
}

export class SelectFormField extends React.Component<Props> {
  updateModelOnChange = (value: string , property: string) => {
    if (this.props.updateModel) {
      this.props.updateModel(value, property);
    }
  }

  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" htmlFor={this.props.label}>{ this.props.label }</Label>
        <Input
          onChange={event => this.props.handleChange(this.props.keyName, event.target.value)}
          className="form-input"
          type="select"
          id={this.props.label}
          value={this.props.value}
        >
          <option disabled>Aucun</option>
          <OptionList options={this.props.options} />
        </Input>
      </FormGroup>
    );
  }
}
