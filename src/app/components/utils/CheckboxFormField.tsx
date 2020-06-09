import { FormGroup, Label } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import React from 'react';

interface Props {
  label: string,
  keyName: string,
  className?: string,
  checkboxes: string[]
}

export class CheckboxFormField extends React.Component<Props> {
  render() {
    return (
      <FormGroup className={this.props.className}>
        <Label className="form-label" for={this.props.keyName}>{ this.props.label }</Label>
        <div className="checkboxes">
          {  this.props.checkboxes.map((elem: string) =>
            <div key={elem}>
              <Input
                className="form-input"
                type="checkbox"
              />{ elem }
            </div>,
          )
          }
        </div>
      </FormGroup>
    );
  }
}
