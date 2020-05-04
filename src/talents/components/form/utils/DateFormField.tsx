import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import DayOptionList from './DayOptionList';
import Input from 'reactstrap/lib/Input';
import MonthOptionList from './MonthOptionList';
import YearOptionList from './YearOptionList';

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
            <DayOptionList />
          </Input>
          <Input
            className='form-input'
            type='select'
            id={ this.props.keyName }
            defaultValue='Mois'
          >
            <MonthOptionList />
          </Input>
          <Input
            className='form-input'
            type='select'
            id={ this.props.keyName }
            defaultValue='Année'
          >
            <YearOptionList />
          </Input>
        </div>
      </FormGroup>  
    );
  }
}

export default DateFormField;