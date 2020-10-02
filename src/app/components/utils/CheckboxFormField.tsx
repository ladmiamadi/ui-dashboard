import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { Checkbox } from '../../index';

interface Props {
  //checkboxes: Checkbox[],
  /*className?: string,
  checkboxes: string[],*/
  checkboxes: Checkbox[],
  className?: string,
  keyName: string,
  label: string,
  handleOnChange: (property: string, value: boolean) => void,
}

export class CheckboxFormField extends React.Component<Props> {
  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" for={this.props.keyName}>{ this.props.label }</Label>
        <div className="checkboxes">
          {  this.props.checkboxes.map(({ label, checked }) =>
            <div key={label}>
              {checked ?
                <Input
                  onChange={(event) => this.props.handleOnChange(label, event.target.checked)}
                  className="form-input"
                  type="checkbox"
                  checked
                />
                :
                <Input
                  onChange={(event) => this.props.handleOnChange(label, event.target.checked)}
                  className="form-input"
                  type="checkbox"
                />
              }
              {label}
            </div>,
          )}
        </div>
      </FormGroup>
    );
  }
}
