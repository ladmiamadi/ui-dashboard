import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { OptionList } from './OptionList';
import { OptionValue } from '../../index';

interface Props {
  className?: string,
  keyName: string,
  label: string,
  options: OptionValue[],
  required?: boolean,
  size?: number,
  value: string,
  showNoSelectionOption?: boolean,
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
    const showNoSelectionOption = (this.props.showNoSelectionOption === undefined)
      ? true
      : this.props.showNoSelectionOption;

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
          {showNoSelectionOption &&
            <option>Aucun</option>
          }
          <OptionList options={this.props.options} />
        </Input>
      </FormGroup>
    );
  }
}
