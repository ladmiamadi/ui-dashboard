import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
  name: string,
  icon?: IconDefinition,
  placeholder?: string,
  onSearch: (search: string) => any,
}

export class SearchBar extends React.Component<Props> {
  render() {
    return (
      <InputGroup id="input">
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="logo-search">
            <FontAwesomeIcon icon={ this.props.icon ? this.props.icon : faSearch } />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder={ this.props.placeholder }
          onChange={({ target }) => this.props.onSearch(target.value)}
          className="search-bar"
        />
      </InputGroup>
    );
  }
}
