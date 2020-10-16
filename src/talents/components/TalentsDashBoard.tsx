import React from 'react';
import { Container } from 'reactstrap';
import { SearchBar } from '../../app/components/utils/SearchBar';
import TalentsList from './TalentsList';
//import { ModalCustom } from '../../app/components/utils/ModalCustom';
import './styles/TalentsList.css';

interface Props {
  searchTerm: string,
  updateSearchTerm: (searchTerm: string) => void,
}


export class TalentsDashBoard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  // updateSearch(event){
  //   this.setState({searchTerm: event.target.value.substr(0,20)});
  // }


  render() {
    // let filteredInterns = this.props.;
    return (
      <Container>
        <div className="search-bar">
          <SearchBar
            onSearch={(value) => {
              this.props.updateSearchTerm(value);
              // this.setState({ searchTerm: value });
              // this.updateSearch.bind(this);
              // console.log(this.props.searchTerm);
            }}
            placeholder="Rechercher un talent..."
            value={this.props.searchTerm}
          />       
        </div>
        <TalentsList />
      </Container>
    );
  }
}