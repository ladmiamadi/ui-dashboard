import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { OptionList } from './OptionList';
import React from 'react';

interface Props {
    selectOptions?: string[],
    label: string,
    keyName: string,
    className?: string
}

export class DateFormField extends React.Component<Props> {
  render() {
    return (
      <FormGroup className={ this.props.className }>
        <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
        <div className='date'>
          <Input
            className='form-input'
            type='select'
            id={ this.props.keyName }
            defaultValue='Jour'
          >
            <OptionList selectOptions='day' />
          </Input>
          <Input
            className='form-input'
            type='select'
            id={ this.props.keyName }
            defaultValue='Mois'
          >
            <OptionList selectOptions='month' />
          </Input>
          <Input
            className='form-input'
            type='select'
            id={ this.props.keyName }
            defaultValue='Année'
          >
            <OptionList selectOptions='year' />
          </Input>
        </div>
      </FormGroup>  
    );
  }
}

export default DateFormField;