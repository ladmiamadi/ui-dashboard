import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import React from 'react';

interface Props {
    label: string,
    keyName: string,
    className?: string
}

export class CheckboxFormField extends React.Component<Props> {
  render() {
    return (
      <FormGroup className={ this.props.className }>
        <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
        <div className='checkbox-days'>
          <div>
            <Input
              className='form-input'
              type='checkbox'
            /> Lundi
          </div>
          <div>
            <Input
              className='form-input'
              type='checkbox'
            /> Mardi
          </div>
          <div>
            <Input
              className='form-input'
              type='checkbox'
            /> Mercredi
          </div>
          <div>
            <Input
              className='form-input'
              type='checkbox'
            /> Jeudi
          </div>
          <div>
            <Input
              className='form-input'
              type='checkbox'
            /> Vendredi
          </div>
          <div>
            <Input
              className='form-input'
              type='checkbox'
            /> Samedi
          </div>
          <div>
            <Input
              className='form-input'
              type='checkbox'
            /> Dimanche
          </div>
        </div>
      </FormGroup>
    );
  }
}

export default CheckboxFormField;