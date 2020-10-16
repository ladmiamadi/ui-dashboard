import React from 'react';
import { Container } from 'reactstrap';
import { SearchBar } from '../../app/components/utils/SearchBar';
import TalentsList from './TalentsList';
import './styles/TalentsList.css';

interface Props {
  searchTerm: string,
  updateSearchTerm: (searchTerm: string) => void,
  updateFilteredUsers: () => void,
}

export class TalentsDashBoard extends React.Component<Props> {

  render() {
    return (
      <Container>
        <div className="search-bar">
          <SearchBar
            onSearch={(value) => {
              this.props.updateSearchTerm(value);
            }}
            placeholder="Rechercher un talent..."
            validateSearch={this.props.updateFilteredUsers}
            value={this.props.searchTerm}
          />       
        </div>
        <TalentsList />
      </Container>
    );
  }
}