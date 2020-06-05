import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { OptionList } from './OptionList';
import React from 'react';

interface Props {
  options: string[],
  label: string,
  keyName: string,
  className?: string,
  handleOnChange: (property: string, value: string) => void,
  value: string,
}

export class SelectFormField extends React.Component<Props> {

  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" for={this.props.keyName}>{ this.props.label }</Label>
        <Input
          onChange={event => this.props.handleOnChange(this.props.keyName, event.target.value)}
          className="form-input"
          type="select"
          id={this.props.keyName}
          value={this.props.value}
        >
          <option disabled>Aucun</option>
          <OptionList options={this.props.options} />
        </Input>
      </FormGroup>
    );
  }
}
