import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import RepeatedNumberOptionList from './RepeatedNumberOptionList';
import YearOptionList from './YearOptionList';

interface Props {
    selectOptions?: string[],
    label: string,
    keyName: string,
    className?: string
}

export class DateFormField extends React.Component<Props> {
  render() {
    const date = new Date();
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
            <RepeatedNumberOptionList numberOfOptions={31} />
          </Input>
          <Input
            className='form-input'
            type='select'
            id={ this.props.keyName }
            defaultValue='Mois'
          >
            <RepeatedNumberOptionList numberOfOptions={12} />
          </Input>
          <Input
            className='form-input'
            type='select'
            id={ this.props.keyName }
            defaultValue='Année'
          >
            <YearOptionList toYear={ date.getFullYear() } fromYear={ (date.getFullYear() - 100) } />
          </Input>
        </div>
      </FormGroup>  
    );
  }
}

export default DateFormField;