import React from 'react';
import { connect } from 'react-redux';
import { REASONS } from '../constants/absence-reasons';
import { RootDispatch } from '../../app/state/store';
import './styles/TimelineOptions.css';

interface Props {
  updateTimelineReason: (reason: string) => void,
}

export class TimelineAbsences extends React.Component<Props> {
  render() {
    return (
      <div className="timeline-filters-reason">
        <label htmlFor="reason">Motifs de l'absence: </label>
        <select name="reasons" id="reasonid" className="timeline-filters-select"
          onChange={e => this.props.updateTimelineReason(e.target.value)}>
          {REASONS.map((reason: string, id: number) => <option key={id} value={reason}>{reason}</option>)}
        </select>
      </div>
    );
  }
}

const mapState = () => ({
    
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateTimelineReason: dispatch.timeline.updateTimelineReason,
});

export default connect(mapState, mapDispatch)(TimelineAbsences);