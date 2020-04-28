import React from 'react';
import { Talent } from '..';
import { TalentsListElement } from './TalentsListElement';

interface Props {
  talents: Talent[]
}

export class TalentsListTable extends React.Component <Props> {
  render() {
    return (
      this.props.talents.map((talent,i) => (
        <TalentsListElement
          key={ i }
          talent={ talent }
        />
      ))
    );
  }
}