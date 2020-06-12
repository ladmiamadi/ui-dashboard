import React from 'react';
import { Container } from 'reactstrap';
import { SearchBar } from '../../app/components/utils/SearchBar';
import TalentsList from './TalentsList';
import './styles/TalentsList.css';

interface Props {}

interface State {
  searchTerm: string,
}

export class TalentsDashBoard extends React.Component<Props, State> {
  constructor(props: Props) {
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
            placeholder="Rechercher un talent..."
            value=""
          />
        </div>
        <TalentsList />
      </Container>
    );
  }
}
