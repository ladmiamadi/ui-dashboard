import React from 'react';
import TimelineAbsences from './TimelineAbsences';
import TimelineFilters from './TimelineFilters';
import './styles/TimelineOptions.css';

export class TimelineOptions extends React.Component {
  render() {
    return (
      <div className="timeline-filters">
        <h1 className="timeline-filters-title" id="title">Filtres</h1>
        <TimelineFilters />
        <h1 className="timeline-filters-title" id="title">Absences</h1>
        <TimelineAbsences />
      </div>
    );
  }
}

export default TimelineOptions;