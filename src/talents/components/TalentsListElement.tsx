import React from 'react';
import { Talent } from '..';
import './styles/TalentsList.css';

interface Props {
  talent: Talent,
}

export class TalentsListElement extends React.Component <Props> {
  render() {
    return (
      <tr className="id-card">
        <td><img src={ this.props.talent.picture_path } /></td>
        <td>{ this.props.talent.firstname }</td>
        <td>{ this.props.talent.lastname }</td>
      </tr>
    );
  }
}