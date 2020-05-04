/* eslint-disable max-len */
/* eslint-disable sort-imports */
import React from 'react';
import { connect } from 'react-redux';
import Input, { InputType } from 'reactstrap/lib/Input';
import { FormGroup, Label } from 'reactstrap';
import { RootDispatch, RootState } from '../../../state/store';
import { Language } from '../state';
import { UpdateLanguagePayload } from '../state/models/userLanguage';
import { OptionList } from './OptionList';

interface Props {
  type: InputType,
  selectOptions?: string[],
  rows?: number,
  label: string,
  regExp?: string | RegExp,
  keyName: string,
  className?: string
  language: Language,
  updateLanguage: (payload: UpdateLanguagePayload) => void
}

export class FieldForm extends React.Component<Props> {
  updateLanguage = (value:string, property:string) =>{
    const payload = {
      property: property,
      value: value
    };

    this.props.updateLanguage(payload);
  }

  render() {
    if(this.props.type === 'select') {
      return (
        <FormGroup className={ this.props.className }>
          <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
          <Input
            onChange= { event => this.updateLanguage(event.target.value, this.props.keyName) }
            className='form-input'
            type={ this.props.type }
            id={ this.props.keyName }
            defaultValue='Aucun'
          >
            <option disabled>Aucun</option>
            <OptionList selectOptions={ this.props.selectOptions } />
          </Input>
        </FormGroup>
      );
    } else if(this.props.type === 'date') {
      return (
        <FormGroup className={ this.props.className }>
          <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
          <div className='date'>
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
    } else if(this.props.type === 'checkbox') {
      return(
        <FormGroup className={ this.props.className }>
          <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
          <div className='checkbox-days'>
            <div>
              <Input
                className='form-input'
                type='checkbox'
              /> Lundi
            </div>
            <div>
              <Input
                className='form-input'
                type='checkbox'
              /> Mardi
            </div>
            <div>
              <Input
                className='form-input'
                type='checkbox'
              /> Mercredi
            </div>
            <div>
              <Input
                className='form-input'
                type='checkbox'
              /> Jeudi
            </div>
            <div>
              <Input
                className='form-input'
                type='checkbox'
              /> Vendredi
            </div>
            <div>
              <Input
                className='form-input'
                type='checkbox'
              /> Samedi
            </div>
            <div>
              <Input
                className='form-input'
                type='checkbox'
              /> Dimanche
            </div>
          </div>
        </FormGroup>
      );
    } else {
      return (
        <FormGroup className={ this.props.className }>
          <Label className='form-label' for={ this.props.keyName }>{ this.props.label }</Label>
          <Input
            className='form-input'
            type={ this.props.type }
            id={ this.props.keyName }
            rows={ this.props.rows }
          />
        </FormGroup>
      );
    }
  }
}

const mapState = (state: RootState) => ({
  language: state.language.language
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateLanguage: dispatch.language.updateLanguage
});

export default connect(mapState, mapDispatch)(FieldForm);
