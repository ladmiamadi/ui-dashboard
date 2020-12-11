import React from 'react';
import { OptionValue } from '../../index';

interface Props {
  options: OptionValue[],
}

export class OptionList extends React.Component<Props> {
  render() {
    return (
      this.props.options.map((optionValue, key) => {
        return (
          <option key={key} value={optionValue.value} className="dropdown-option">
            {optionValue.label}
          </option>
        );
      })
    );
  }
}
