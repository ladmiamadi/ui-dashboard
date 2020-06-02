import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';

interface Props {
  talent: User,
  modifyUser: (event: any) => void,
}

interface State {
  talent: User,
}

export class TalentFormAddress extends React.Component <Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      talent: this.props.talent,
    };
  }

  handleChange(category: string, property : string, event: any) {
    const payload = {
      category: category,
      property : property,
      value : event,
    };
    console.log(payload, 'handleChange payload');
    this.props.modifyUser(payload);
  }

  render() {
    console.log(typeof this.state.talent.userAddress, 'user address');
    return (
      <div className="form-section">
        <FieldForm
          keyName='street'
          label='Rue: '
          className='medium'
          type='text'
          handleChange ={ (event: MouseEvent) => this.handleChange('userAddress', 'street', event) }
          value={ this.state.talent.userAddress?.street }
        />
        <FieldForm
          keyName='number'
          label='Num: '
          type='text'
          handleChange ={ (event: MouseEvent) => this.handleChange('userAddress', 'number', event) }
          value={ this.state.talent.userAddress }
        />
        <FieldForm
          keyName='postal-box'
          label='BP: '
          type='text'
          handleChange ={ (event: MouseEvent) => this.handleChange('userAddress', 'box', event) }
          value={ this.state.talent.userAddress }
        />
        <FieldForm
          keyName='postal-code'
          label='Code Postal: '
          type='text'
          handleChange ={ (event: MouseEvent) => this.handleChange('userAddress', 'zip-code', event) }
          value={ this.state.talent.userAddress }
        />
        <FieldForm
          keyName='city'
          label='Ville: '
          className='medium'
          type='text'
          handleChange ={ (event: MouseEvent) => this.handleChange('userAddress', 'city', event) }
          value={ this.state.talent.userAddress }
        />
        <SelectFormField
          keyName='country'
          label='Pays: '
          options={ ['aaa', 'bbb'] }
        />
        <FieldForm
          keyName='DOB'
          label='Date de naissance: '
          type='text'
          handleChange ={ (event: MouseEvent) => this.handleChange('userAddress', 'DOB', event) }
          value={ this.state.talent.userProfiles }
        />
        <SelectFormField
          keyName='search'
          label='Actuellement en recherche: '
          options={ ['Oui', 'Non'] }
        />
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  talent: state.user.user
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormAddress);
