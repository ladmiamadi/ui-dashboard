import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { IncrementalNumberOptionsList } from './IncrementalNumberOptionList';
import Input from 'reactstrap/lib/Input';
import { YearOptionList } from './YearOptionList';
import { UtilsDate, YearSegment } from '../../index';

interface Props {
  className?: string,
  label: string,
  keyName: string,
  values: UtilsDate,
  yearSegment: YearSegment,
  handleOnChange: (property: string, value: number) => void,
}

export class DateFormField extends React.Component<Props> {
  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" for={this.props.keyName}>{ this.props.label }</Label>
        <div className="date">
          <Input
            onChange={(event) => this.props.handleOnChange(this.props.keyName + '-day', +event.target.value)}
            className="form-input"
            type="select"
            id={this.props.keyName + '-day'}
            value={this.props.values.day}
          >
            <IncrementalNumberOptionsList numberOfOptions={31} />
          </Input>
          <Input
            onChange={(event) => this.props.handleOnChange(this.props.keyName + '-month', +event.target.value)}
            className="form-input"
            type="select"
            id={this.props.keyName + '-month'}
            value={this.props.values.month}
          >
            <IncrementalNumberOptionsList numberOfOptions={12} />
          </Input>
          <Input
            onChange={(event) => this.props.handleOnChange(this.props.keyName + '-year', +event.target.value)}
            className="form-input"
            type="select"
            id={this.props.keyName + '-year'}
            value={this.props.values.year}
          >
            <YearOptionList
              fromYear={this.props.yearSegment.yearStart}
              toYear={this.props.yearSegment.yearEnd} />
          </Input>
        </div>
      </FormGroup>
    );
  }
}
