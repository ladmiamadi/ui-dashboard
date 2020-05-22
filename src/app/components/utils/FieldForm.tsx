import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Input, { InputType } from 'reactstrap/lib/Input';

interface Props {
  rows?: number,
  label: string,
  keyName: string,
  className?: string,
  type: InputType,
  value?: any,
  handleChange(value : any): void
}

interface State {
  value?: any,
}

export class FieldForm extends React.Component<Props, State> {
  handleChange(event : any) {
    if(this.props.handleChange) {
      this.props.handleChange(event.target.value);
    }
  }

  render() {
    console.log(this.state, 'render');
    return (
      <FormGroup className={ this.props.className }>
        <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
        <Input
          className='form-input'
          type={ this.props.type }
          id={ this.props.keyName }
          rows={ this.props.rows }
          onChange={ (event : any) => this.handleChange(event) }
          value={this.props.value}
        />
      </FormGroup>
    );
  }
}
