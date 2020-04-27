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
    keyName: string
}

interface State {
    className: string;
}

export class FieldForm extends React.Component<Props,State> {
  constructor(props: Props){
    super(props);

    this.state = {
      className: 'form-input',
    };
  }

    checkFormValid = (property: string) => {
      /*if(!this.props.client[property]) {
            return this.setState({ className:'form-input invalid' });
        }*/
      console.log(property);

      this.setState(({ className:'form-input' }));
    }

    /*checkRegExpAndUpdateClient = (property: string, value: number | string) => {
        this.updateClient(property, '');

        if(this.props.regExp && RegExpCheck.checkRegEx(this.props.regExp, value)) {
            this.updateClient(property,value);
        }
    }

    updateClient = ( property: string, value: number | string ) => {
        const payload = {
            property: property,
            value: value
        };

        this.props.updateClient(payload);
    }*/

    render() {
      if(this.props.type === 'select') {
        return (
          <FormGroup>
            <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
            <Input
              onBlur = { () => this.checkFormValid(this.props.keyName)}
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
                onBlur = { () => this.checkFormValid(this.props.keyName)}
                className='form-input'
                type={ this.props.type }
                id={ this.props.keyName }
                defaultValue="Aucun"
              >
                <option disabled>Aucun</option>
                <OptionList selectOptions={ this.props.selectOptions } />
              </Input>
              <Input
                onBlur = { () => this.checkFormValid(this.props.keyName)}
                className='form-input'
                type={ this.props.type }
                id={ this.props.keyName }
                defaultValue="Aucun"
              >
                <option disabled>Aucun</option>
                <OptionList selectOptions={ this.props.selectOptions } />
              </Input>
              <Input
                onBlur = { () => this.checkFormValid(this.props.keyName)}
                className='form-input'
                type={ this.props.type }
                id={ this.props.keyName }
                defaultValue="Aucun"
              >
                <option disabled>Aucun</option>
                <OptionList selectOptions={ this.props.selectOptions } />
              </Input>
            </div>
          </FormGroup>
                
        );
      } else {
        return (
          <FormGroup>
            <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
            <Input
              onBlur = { () => this.checkFormValid(this.props.keyName) }
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