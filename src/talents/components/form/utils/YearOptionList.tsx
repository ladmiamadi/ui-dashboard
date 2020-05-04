import React  from 'react';

export class YearOptionList extends React.Component {
  render() {
    let currentYear = new Date();
    let yearArray = [];
    
    for (let yearNumber = 1920; yearNumber <= currentYear.getFullYear(); yearNumber++) {
      yearArray.push(yearNumber.toString());
    }

    if(yearArray.length > 0) {
      return yearArray.map((item,key) =>
        <option key={ key } className='dropdown-option'>{ item }</option>     
      );
    }
  }
}

export default YearOptionList;