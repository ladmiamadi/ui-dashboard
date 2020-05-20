import './styles/TalentsList.css';
import { Container } from 'reactstrap';
import React from 'react';
import { RootState } from '../../app/state/store';
import { SearchBar } from '../../app/utils/SearchBar';
import { TalentsListTable } from './TalentsListTable';
import { User } from '../../app';
import { connect } from 'react-redux';

interface Props {
  talents: User[],
}

interface State {
  name: string,
}

export class TalentsList extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  handleSearch = (filterType: 'name', value: string) => {
    if (filterType === 'name') {
      this.setState({ ...this.state, name: value });
    }
  }

  render() {
    return (
      <Container className='container-talents-list-table'>
        <div className="search-bar">
          <SearchBar
            handleSearch={ this.handleSearch }
            name="name"
            iconName="search"
            placeholder="Rechercher un talent..."
          />
        </div>
        <TalentsListTable talents={ this.props.talents } />
      </Container>
    );
  }
}

const mapState = (state: RootState) => ({
  talents: state.talents.list,
});

export default connect(mapState)(TalentsList);
