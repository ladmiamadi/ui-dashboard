import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
  name: string;
  handleSearch(name: string, search: string): any;
  placeholder: string;
  iconName: string;
  icon?: IconDefinition;
}

const faSearchs = faSearch;

export class SearchBar extends React.Component<Props> {
  handleOnChange = ({ target }: any) => {
    this.props.handleSearch(this.props.name, target.value);
  };

  render() {
    return (
      <InputGroup id="input">
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="logo-search">
            <FontAwesomeIcon icon={ this.props.icon ? this.props.icon : faSearchs } />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder={ this.props.placeholder }
          onChange={ this.handleOnChange }
          className="search-bar"/>
      </InputGroup>
    );
  }
}
