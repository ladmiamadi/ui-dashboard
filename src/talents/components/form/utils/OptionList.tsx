import React  from 'react';

interface Props {
  selectOptions?: string[];
}

export class OptionList extends React.Component <Props> {
  render() {
    if(Array.isArray(this.props.selectOptions)) {
      return this.props.selectOptions.map((item,key) =>
        <option key={ key } className='dropdown-option'>{ item }</option>     
      );
    }
  }
}