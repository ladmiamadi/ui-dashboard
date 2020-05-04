import React  from 'react';

export class DayOptionList extends React.Component {
  render() {
    let dayArray = [];
    
    for (let dayNumber = 1; dayNumber <= 31; dayNumber++) {
      dayArray.push(dayNumber.toString());
    }

    if(dayArray.length > 0) {
      return dayArray.map((item,key) =>
        <option key={ key } className='dropdown-option'>{ item }</option>     
      );
    }
  }
}

export default DayOptionList;