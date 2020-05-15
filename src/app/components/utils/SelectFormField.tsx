import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { Language } from '../../../talents/components/form/state';
import { OptionList } from './OptionList';
import React from 'react';

interface Props {
  options: string[],
  label: string,
  keyName: keyof Language | string,
  className?: string
  updateModel?: ( property:string, value:string ) => void;
}

export class SelectFormField extends React.Component<Props> {
  updateModelOnChange = (property:string , value:string) =>{
    if (this.props.updateModel){
      this.props.updateModel(property, value);
    }
  }

  render() {
    return (
      <FormGroup className={ this.props.className }>
        <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
        <Input
          onChange= { event => this.updateModelOnChange(this.props.keyName, event.target.value) }
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
