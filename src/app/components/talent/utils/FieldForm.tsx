/* eslint-disable max-len */
/* eslint-disable sort-imports */
import React from 'react';
import Input, { InputType } from 'reactstrap/lib/Input';
import { FormGroup, Label } from 'reactstrap';
import { OptionList } from './OptionList';

interface Props {
    type: InputType,
    selectOptions?: string[],
    rows?: number,
    label: string,
    regExp?: string | RegExp,
    keyName: string,
  showOtherComponents?: (value:boolean) => void
}

interface State {
    className: string
}

export class FieldForm extends React.Component<Props,State> {
  constructor(props: Props){
    super(props);

    this.state = {
      className: 'form-input'
    };
  }

  showLevelLanguage = (value:string) =>{
    if (value !== 'Aucun' && this.props.showOtherComponents) {
      this.props.showOtherComponents(true);
    }
  }

  render() {
    if(this.props.type === 'select') {
      return (
        <FormGroup>
          <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
          <Input
            onChange= { event => this.showLevelLanguage(event.target.value) }
            className='form-input'
            type={ this.props.type }
            id={ this.props.keyName }
            defaultValue="Aucun"
          >
            <option disabled>Aucun</option>
            <OptionList selectOptions={ this.props.selectOptions } />
          </Input>
        </FormGroup>
      );
    } else if(this.props.type === 'date') {
      return (
        <FormGroup>
          <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
          <div className="date">
            <Input
              className='form-input'
              type= 'select'
              id={ this.props.keyName }
              defaultValue='Jour'
            >
              <OptionList selectOptions='day' />
            </Input>
            <Input
              className='form-input'
              type= 'select'
              id={ this.props.keyName }
              defaultValue='Mois'
            >
              <OptionList selectOptions='month' />
            </Input>
            <Input
              className='form-input'
              type= 'select'
              id={ this.props.keyName }
              defaultValue='Année'
            >
              <OptionList selectOptions='year' />
            </Input>
          </div>
        </FormGroup>
                
      );
    } else {
      return (
        <FormGroup>
          <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
          <Input
            className={ this.state.className }
            type={ this.props.type }
            id={ this.props.keyName }
            rows={ this.props.rows }
          />
        </FormGroup>
      );
    }
  }
}

export default FieldForm;
