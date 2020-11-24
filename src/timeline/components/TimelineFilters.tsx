import React from 'react';
import { listOfFonctionsInterface, timelineOptionsPropsInterface } from '../index';
import './styles/TimelineOptions.css';
import { toggleCheckBox, updateSearchTherms, toggleEmptyFields } from '../helpers/updateTimelineOptions';

interface Props {
  timelineOptionsProps: timelineOptionsPropsInterface,
}

export class TimelineFilters extends React.Component<Props> {

  checkFonctionDisplay = (onetb: listOfFonctionsInterface) => {
    return (onetb.display === 1);
  };

  render() {
    return (
      <div>
        <div className="timeline-filters-checkboxes">
          {this.props.timelineOptionsProps.timeline.timelineFonctions.map(
            (tb: listOfFonctionsInterface, index: number) => 
              <label key={index} className="timeline-filters-checkboxes">{tb.groupname} ({tb.total})
                <input className="checkboxinput" type="checkbox" 
                  onChange={() => {toggleCheckBox(this.props.timelineOptionsProps, index);}}
                  defaultChecked={this.checkFonctionDisplay(tb)} ></input>
                <span className="checkmark"></span>
              </label> )}
        </div>
        <div className="timeline-filters-search">Rechercher un nom : 
          <input onChange={e => updateSearchTherms(this.props.timelineOptionsProps, e.target.value)} type="text" 
            className="timeline-filters-search-name"></input>
          <label className="timeline-filters-checkboxes">Masquer lignes vides
            <input className="checkboxinput" type="checkbox" 
              onChange={() => {toggleEmptyFields(this.props.timelineOptionsProps);}} defaultChecked={false}></input>
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
    );
  }
}

export default TimelineFilters;