import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { OptionList } from './OptionList';
import React from 'react';

interface Props {
  options: string[],
  label: string,
  keyName: string,
  className: string
  updateModel?: ( value:string, property:string ) => void;
}

export class SelectFormField extends React.Component<Props> {
  updateModelOnChange = (value:string , property:string) =>{
    if (this.props.updateModel){
      this.props.updateModel(value, property);
    }
  }

  render() {
    return (
      <FormGroup className={ this.props.className }>
        <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
        <Input
          onChange= { event => this.updateModelOnChange(event.target.value, this.props.keyName) }
          className={ this.props.className }
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
