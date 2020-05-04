import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import React from 'react';

interface Props {
    label: string,
    keyName: string,
    className?: string
}

export class TextFormField extends React.Component<Props> {
  render() {
    return (
      <FormGroup className={ this.props.className }>
        <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
        <Input
          className='form-input'
          type='text'
          id={ this.props.keyName }
        />
      </FormGroup>
    );
  }
}

export default TextFormField;