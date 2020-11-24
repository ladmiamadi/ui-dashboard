import React from 'react';
import { 
  listOfFonctionsInterface, 
  timelineFilters,
} from '../index';
import { TimelineAbsences } from './TimelineAbsences';
import { TimelineFilters } from './TimelineFilters';
import './styles/TimelineOptions.css';

interface Props {
  updateTimelineReason: (reason: string) => void,
  updateTimelineSearchName: (searchName: string) => void,
  updateTimelineFonctions: (timelineFonctions: listOfFonctionsInterface[]) => void,
  updateTimelineEmptyField: (displayEmptyField: boolean) => void,
  timeline: timelineFilters,
}

export class TimelineOptions extends React.Component<Props> {
  render() {

    return (
      <div className="timeline-filters">
        <h1 className="timeline-filters-title" id="title">Filtres</h1>
        <TimelineFilters timelineOptionsProps={this.props} />
        <h1 className="timeline-filters-title" id="title">Absences</h1>
        <TimelineAbsences updateTimelineReason={(newreason: string) => this.props.updateTimelineReason(newreason)} />
      </div>
    );
  }
}

export default TimelineOptions;