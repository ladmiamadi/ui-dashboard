import React  from 'react';

interface Props {
  options?: string[];
}

export class OptionList extends React.Component <Props> {
  render() {
    if(Array.isArray(this.props.options)) {
      return this.props.options.map((item,key) =>
        <option key={ key } className='dropdown-option'>{ item }</option>     
      );
    }
  }
}

export default OptionList;