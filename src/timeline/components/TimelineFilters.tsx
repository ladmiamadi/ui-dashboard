import React from 'react';
import { connect } from 'react-redux';
import { GroupDisplay, TimelineFilterData } from '../index';
import { toggleCheckBox, updateSearchTherms, toggleEmptyFields } from '../helpers/updateTimelineOptions';
import { RootDispatch, RootState } from '../../app/state/store';
import './styles/TimelineOptions.css';

interface Props {
    timeline: TimelineFilterData,
    updateTimelineSearchName: (searchName: string) => void,
    updateTimelineFonctions: (timelineFonctions: GroupDisplay[]) => void,
    updateTimelineEmptyField: (displayEmptyField: boolean) => void,
}

export class TimelineFilters extends React.Component<Props> {
  render() {
    return (
      <div>
        <div className="timeline-filters-checkboxes">
          {this.props.timeline.timelineFonctions.map(
            (tb: GroupDisplay, index: number) => 
              <label key={index} className="timeline-filters-checkboxes">{tb.groupname} ({tb.total})
                <input className="checkboxinput" type="checkbox" 
                  onChange={() => {toggleCheckBox( this.props.updateTimelineFonctions, this.props.timeline, index);}}
                  defaultChecked={tb.display} />
                <span className="checkmark"/>
              </label> )}
        </div>
        <div className="timeline-filters-search">Rechercher un nom :
          <input onChange={
            e => updateSearchTherms(this.props.updateTimelineSearchName,
              this.props.timeline, e.target.value)} type="text"
          className="timeline-filters-search-name"/>
          <label className="timeline-filters-checkboxes">Masquer lignes vides
            <input className="checkboxinput" type="checkbox" 
              onChange={() => {
                toggleEmptyFields(this.props.updateTimelineEmptyField, this.props.timeline);}} defaultChecked={false}/>
            <span className="checkmark"/>
          </label>
        </div>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  timeline: state.timeline,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateTimelineSearchName: dispatch.timeline.updateTimelineSearchName,
  updateTimelineEmptyField: dispatch.timeline.updateTimelineEmptyField,
  updateTimelineFonctions: dispatch.timeline.updateTimelineFonctions,
});

export default connect(mapState, mapDispatch)(TimelineFilters);