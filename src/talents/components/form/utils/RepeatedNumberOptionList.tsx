import React from 'react';
import OptionList from './OptionList';

interface Props {
  numberOfOptions: number,
}
  
export class RepeatedNumberOptionsList extends React.Component<Props> {
  render() {
    const options = Array.from(Array(this.props.numberOfOptions)).map((value, index) => String(index + 1));
  
    return <OptionList options={options} />;
  }
}

export default RepeatedNumberOptionsList;