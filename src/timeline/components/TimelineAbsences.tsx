import React from 'react';
import { reasons } from '../constants/absenceReasons';
import './styles/TimelineOptions.css';

interface Props {
  updateTimelineReason: (reason: string) => void,
}

interface State {
  reasons: string[],
}

export class TimelineAbsences extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);

    this.state = {
      reasons,
    };
  }
  render() {
    return (
      <div className="timeline-filters-reason">
        <label htmlFor="reason">Motifs de l'absence: </label>
        <select name="reasons" id="reasonid" className="timeline-filters-select"
          onChange={e => this.props.updateTimelineReason(e.target.value)}>
          {this.state.reasons.map((rs: string, id: number) => <option key={id} value={rs}>{rs}</option>)}
        </select>
      </div>
    );
  }
}

export default TimelineAbsences;