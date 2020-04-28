import React from 'react';
import { Talent } from '..';

interface Props {
  talent: Talent,
}

export class TalentsListElement extends React.Component <Props> {
  render() {
    return (
      <tr>
        <td>{ this.props.talent.photo}</td>
        <td>{ this.props.talent.firstname }</td>
        <td>{ this.props.talent.lastname }</td>
      </tr>
    );
  }
}