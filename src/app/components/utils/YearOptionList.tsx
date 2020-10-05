import React  from 'react';
import { OptionList } from './OptionList';

interface Props {
  fromYear: number,
  toYear: number,
  //fromYear: number,
}

export class YearOptionList extends React.Component<Props> {
  private createArrayOfYears() {
    const numberOfValues: number = Math.abs(this.props.fromYear - this.props.toYear) + 1;
    const incrementOrder: number = this.props.fromYear <= this.props.toYear ? 1 : -1;
    let currentYear: number = this.props.fromYear - incrementOrder;

    return (
      Array.from(Array(numberOfValues))
        .map(() => String(currentYear += incrementOrder))
    );
  }

  render() {
    return <OptionList options={this.createArrayOfYears()} />;
  }
}
