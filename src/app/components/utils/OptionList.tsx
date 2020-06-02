import React  from 'react';

interface Props {
  options: string[];
}

export class OptionList extends React.Component <Props> {
  render() {
    return this.props.options.map((item,key) =>
      <option value={ item } key={ key } className='dropdown-option'>{ item }</option>);
  }
}
