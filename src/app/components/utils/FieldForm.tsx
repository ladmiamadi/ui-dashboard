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
  handleChange( event: MouseEvent): void,
}

interface State {
  value?: any,
}

export class FieldForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  handleChange(event : any, ) {
    if(this.props.handleChange) {
      this.props.handleChange( event);
    }
  }

  render() {
    return (
      <FormGroup className={ this.props.className }>
        <Label className='form-label' htmlFor={ this.props.keyName }>{ this.props.label }</Label>
        <Input
          className='form-input'
          type={ this.props.type }
          id={ this.props.keyName }
          rows={ this.props.rows }
          onChange={ (event) => this.handleChange(event.target.value) }
          defaultValue={ this.state.value }
        />
      </FormGroup>
    );
  }
}
