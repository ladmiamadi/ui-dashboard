import './styles/TalentsList.css';
import React from 'react';
import { Table } from 'reactstrap';
import { TalentsListElement } from './TalentsListElement';
import { User } from '../../app';

interface Props {
  talents: User[]
}

export class TalentsListTable extends React.Component <Props> {
  render() {
    return (
      <Table>
        <thead className="table-talents">
          { this.props.talents.map((talent,i) => (
            <TalentsListElement
              key={ i }
              talent={ talent }
            />
          )) }
        </thead>
      </Table>  
    );
  }
}
