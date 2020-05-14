import React from 'react';
import { Table } from 'reactstrap';
import { User } from '..';
import { TalentsListElement } from './TalentsListElement';
import './styles/TalentsList.css';

interface Props {
  talents: User[]
}

export class TalentsListTable extends React.Component <Props> {
  render() {
    return (
      <Table>
        <thead className="table-talents">
          {this.props.talents.map((talent,i) => (
            <TalentsListElement
              key={ i }
              talent={ talent }
            />
          ))}
        </thead>
      </Table>  
    );
  }
}
