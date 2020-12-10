import React from 'react';

export interface OptionValue {
  value: string,
  label: string,
}

interface Props {
  options: OptionValue[],
}

export class OptionList extends React.Component<Props> {

  render() {
    return this.props.options.map((optionValue, key: number) =>
      <option key={key} value={optionValue.value} className="dropdown-option">
        {optionValue.label}
      </option>);
  }

}
