import React from 'react';
import { Talent } from '..';
import { Container } from 'reactstrap';
import { SearchBar } from '../../app/utils/SearchBar';
import { RootState } from './../../app/state/store';
import { connect } from 'react-redux';
import { TalentsListTable } from './TalentsListTable';

interface Props {
  talents: Talent[],
}

interface State {
  name: string,
}

export class TalentsList extends React.Component <Props, State> {
  constructor (props: Props) {
    super (props);

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
        <SearchBar
          handleSearch={ this.handleSearch }
          name="name"
          iconName="search"
          placeholder="Rechercher un talent..."
        />
        <TalentsListTable talents={ this.props.talents } />
      </Container>
    );
  }
}

const mapState = (state: RootState) => ({
  talents: state.talents.list,
});

export default connect(mapState)(TalentsList);