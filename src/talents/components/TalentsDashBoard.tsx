import React from 'react';
import { Container } from 'reactstrap';
import { SearchBar } from '../../app/components/utils/SearchBar';
import TalentsList from './TalentsList';
import { User } from '../../app';
import './styles/TalentsList.css';

interface Props {
  searchTerm: string,
  users: User[]
  updateSearchTerm: (searchTerm: string) => void,
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
            value={this.props.searchTerm}
          />       
        </div>
        <TalentsList
          searchTerm={this.props.searchTerm}
          users={this.props.users}
        />
      </Container>
    );
  }
}