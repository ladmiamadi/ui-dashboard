import React  from 'react';

interface Props{
  selectOptions?: string[] | string
}

interface State{
  option: string[] | null
}

export class OptionList extends React.Component <Props, State> {
  constructor(props:Props) {
    super(props);

    this.state = {
      option: null
    };
  }
  render() {
    let currentYear = new Date();
    let dateArray = [];
    if (this.props.selectOptions === 'day') {
      for (let dayNumber = 1; dayNumber <= 31; dayNumber++) {
        dateArray.push(dayNumber.toString());
      }

    } else if (this.props.selectOptions === 'month') {
      for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
        dateArray.push(monthNumber.toString());
      }

    } else if (this.props.selectOptions === 'year') {
      for (let yearNumber = 1920; yearNumber <= currentYear.getFullYear(); yearNumber++) {
        dateArray.push(yearNumber.toString());
      }

    }

    if(Array.isArray(this.props.selectOptions)) {
      return this.props.selectOptions.map((item,key) =>
        <option key={ key } className='dropdown-option'>{ item }</option>     
      );
    }

    if(dateArray.length > 0) {
      return dateArray.map((item,key) =>
        <option key={ key } className='dropdown-option'>{ item }</option>     
      );
    }

    return 'a';
  }
}