import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { OptionList } from './OptionList';
import React from 'react';

interface Props {
    options?: string[],
    rows?: number,
    label: string,
    keyName: string,
    className?: string
}

export class SelectFormField extends React.Component<Props> {
  render() {
    return (
      <FormGroup className={ this.props.className }>
        <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
        <Input
          className='form-input'
          type='select'
          id={ this.props.keyName }
          defaultValue='Aucun'
        >
          <option disabled>Aucun</option>
          <OptionList options={ this.props.options } />
        </Input>
      </FormGroup>
    );
  }
}

export default SelectFormField;