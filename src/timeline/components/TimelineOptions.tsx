import React from 'react';
import { RootDispatch, RootState } from '../../app/state/store';
import { connect } from 'react-redux';
import { 
  GroupDisplay, 
  TimelineFilterData,
} from '../index';
import { TimelineAbsences } from './TimelineAbsences';
import { TimelineFilters } from './TimelineFilters';
import './styles/TimelineOptions.css';

interface Props {
  updateTimelineReason: (reason: string) => void,
  updateTimelineSearchName: (searchName: string) => void,
  updateTimelineFonctions: (timelineFonctions: GroupDisplay[]) => void,
  updateTimelineEmptyField: (displayEmptyField: boolean) => void,
  timeline: TimelineFilterData,
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

const mapState = (state: RootState) => ({
  timeline: state.timeline,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateTimelineReason: dispatch.timeline.updateTimelineReason,
  updateTimelineSearchName: dispatch.timeline.updateTimelineSearchName,
  updateTimelineEmptyField: dispatch.timeline.updateTimelineEmptyField,
  updateTimelineFonctions: dispatch.timeline.updateTimelineFonctions,
});

export default connect(mapState, mapDispatch)(TimelineOptions);