import React from 'react';
import { SearchBar } from '../../app/components/utils/SearchBar';
import { OffersList } from './OffersList';
import { Job } from '../../app';
import './styles/TalentsList.css';

interface Props {
  searchTerm: string,
  jobs: Job[]
  updateSearchTerm: (searchTerm: string) => void,
}

export class OffersDashBoard extends React.Component<Props> {
  render() {
    return (
      <div>
        <div className="search-bar">
          <SearchBar
            onSearch={(value) => {
              this.props.updateSearchTerm(value);
            }}
            placeholder="Rechercher un talent..."
            value={this.props.searchTerm}
          />
        </div>
        <OffersList
          searchTerm={this.props.searchTerm}
          jobs={this.props.jobs}
        />
      </div>
    );
  }
}