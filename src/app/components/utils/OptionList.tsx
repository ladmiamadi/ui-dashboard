import React from 'react';

export interface OptionValue {
  value: string,
  label: string,
}

interface Props {
  options: string[] | OptionValue[],
}

export class OptionList extends React.Component<Props> {
  instanceOfOptionValueArray(object: any): object is OptionValue[] {
    return object instanceof Array
      && object.length > 0
      && object[0] instanceof Object
      && 'label' in object[0];
  }

  render() {
    if (this.instanceOfOptionValueArray(this.props.options)) {
      return this.props.options.map((optionValue, key: number) =>
        <option key={key} value={optionValue.value} className="dropdown-option">
          {optionValue.label}
        </option>);
    } else {
      return this.props.options.map((item, key: number) =>
        <option key={key} value={item} className="dropdown-option">
          {item}
        </option>);
    }
  }
}
