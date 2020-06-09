import React from 'react';
import { Container } from 'reactstrap';
import { SearchBar } from '../../app/components/utils/SearchBar';
import TalentsList from './TalentsList';
import './styles/TalentsList.css';

interface State {
  searchTerm: string,
}

export class TalentsDashBoard extends React.Component <any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      searchTerm: '',
    };
  }

  render() {
    return (
      <Container>
        <div className="search-bar">
          <SearchBar
            onSearch={(value) => this.setState({ searchTerm: value })}
            name="talent-search"
            placeholder="Rechercher un talent..."
          />
        </div>
        <TalentsList />
      </Container>
    );
  }
}
