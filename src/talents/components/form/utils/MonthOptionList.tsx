import React  from 'react';

export class MonthOptionList extends React.Component {
  render() {
    let monthArray = [];
    
    for (let dayNumber = 1; dayNumber <= 31; dayNumber++) {
      monthArray.push(dayNumber.toString());
    }

    if(monthArray.length > 0) {
      return monthArray.map((item,key) =>
        <option key={ key } className='dropdown-option'>{ item }</option>     
      );
    }
  }
}

export default MonthOptionList;