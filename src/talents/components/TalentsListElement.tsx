import React from 'react';
import { Talent } from '..';
import  './styles/TalentsList.css';

interface Props {
  talent: Talent,
}

export class TalentsListElement extends React.Component <Props> {
  render() {
    return (
      <tr className="id-card">
        <td>{ this.props.talent.id }</td>
        <td>{ this.props.talent.firstname }</td>
        <td>{ this.props.talent.lastname }</td>
      </tr>
    );
  }
}