import React from 'react';
import { User } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { FieldForm } from '../../../app/components/utils/FieldForm';

interface Props {
  talent: User,
}

interface State {
  value: string
}

export class TalentFormAddress extends React.Component <Props, State>{
  handleChange(value : any) {
    this.setState({ value : value });
    console.log(this.state.value, 'value of handlechange');
  }

  componentDidMount() {
    console.log(this.props.talent.userProfiles.find((profile) => profile.environment === 'live'), 'éezezzeze');
  }

  render() {
    return (
      <div className="form-section">
        <FieldForm
          keyName='street'
          label='Rue: '
          className='medium'
          type='text'
          handleChange ={ this.handleChange }
          value={ this.props.talent.userAddress?.street }
        />
        <FieldForm
          keyName='number'
          label='Num: '
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userAddress?.number }
        />
        <FieldForm
          keyName='postal-box'
          label='BP: '
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userAddress?.box }
        />
        <FieldForm
          keyName='postal-code'
          label='Code Postal: '
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userAddress?.zipCode.toString() }
        />
        <FieldForm
          keyName='city'
          label='Ville: '
          className='medium'
          type='text'
          handleChange ={this.handleChange}
          value={ this.props.talent.userAddress?.city }
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
          handleChange ={this.handleChange}
          value={ this.props.talent.userProfiles.map((elem) => elem.birthDate) }
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

export default TalentFormAddress;
