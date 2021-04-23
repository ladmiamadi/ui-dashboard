import React from 'react';
import { SearchBar } from '../../app/components/utils/SearchBar';
import { Job } from '../../app';
import OffersList from './OffersList';

interface Props {
  searchTerm: string,
  jobs: Job[],
  updateSearchTerm: (searchTerm: string) => void,
}

export class OffersDashBoard extends React.Component<Props> {
  render() {
    return (
      <div>
        <div className="search-bar">
          <SearchBar
            onSearch={(value) => { this.props.updateSearchTerm(value); }}
            placeholder="Rechercher une offre..."
            value={this.props.searchTerm}
          />
        </div>
        <OffersList
          jobs={this.props.jobs}
          searchTerm={this.props.searchTerm}
        />
      </div>
    );
  }
}