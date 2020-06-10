import React  from 'react';
import { OptionList } from './OptionList';

interface Props {
  toYear: number,
  fromYear: number
}

export class YearOptionList extends React.Component<Props> {
  private createArrayOfYears() {
    const numberOfValues = (this.props.toYear - this.props.fromYear) + 1;
    let currentYear = this.props.fromYear;

    return Array.from(Array(numberOfValues)).map(() => String(currentYear++));
  }

  render() {
    return <OptionList options={this.createArrayOfYears()} />;
  }
}
