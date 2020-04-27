import React  from 'react';

interface Props{
    selectOptions?: string[],
}

export class OptionList extends React.Component <Props> {
  render() {
    return this.props.selectOptions?.map((item,key) =>
      <option key={ key } className='dropdown-client-page'>{ item }</option>     
        );
  }
}