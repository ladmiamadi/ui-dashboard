import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import React from 'react';

interface Props {
    rows?: number,
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
          type='textarea'
          id={ this.props.keyName }
          rows={ this.props.rows }
        />
      </FormGroup>
    );
  }
}

export default TextFormField;