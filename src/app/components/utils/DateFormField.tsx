import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { IncrementalNumberOptionsList } from './IncrementalNumberOptionList';
import Input from 'reactstrap/lib/Input';
import { YearOptionList } from './YearOptionList';

interface Props {
  options?: string[],
  label: string,
  keyName: string,
  className?: string,
  day: string,
  month: string,
  year: string,
}

export class DateFormField extends React.Component<Props> {
  render() {
    const date = new Date();

    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" htmlFor={this.props.keyName}>{ this.props.label }</Label>
        <div className="date">
          <Input
            className="form-input"
            type="select"
            id={this.props.keyName}
            defaultValue={this.props.day}
          >
            <IncrementalNumberOptionsList numberOfOptions={31} />
          </Input>
          <Input
            className="form-input"
            type="select"
            id={this.props.keyName}
            defaultValue={this.props.month}
          >
            <IncrementalNumberOptionsList numberOfOptions={12} />
          </Input>
          <Input
            className="form-input"
            type="select"
            id={this.props.keyName}
            defaultValue={this.props.year}
          >
            <YearOptionList toYear={date.getFullYear()} fromYear={(date.getFullYear() - 100)} />
          </Input>
        </div>
      </FormGroup>
    );
  }
}
