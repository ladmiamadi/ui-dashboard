import React from 'react';
import { listOfFonctionsInterface } from '../index';
import { defaultAbsenceReason } from '../helpers/initialise';
import './styles/TimelineFilters.css';

interface Props {
  listOfFonctions: listOfFonctionsInterface[],
  onChangeCheckBox: (onetable: number) => void,
  onChangeName: (nametochange: string) => void,
  onChangeReason: (newreason: string) => void,
  onChangeEmptyField: () => void,
}

interface State {
  reasons: string[],
}

export class TimelineFilters extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);

    const reasons = [
      defaultAbsenceReason(),
      'Personnel',
      'Non Justifiée',
      'Formation',
      'Retard',
      'Déplacement',
    ];

    this.state = {
      reasons,
    };
  }

  checkFonctionDisplay = (onetb: listOfFonctionsInterface) => {
    return (onetb.display === 1);
  };

  RenderAbsenceReasons = (reason: string, index: number) => {
    return (
      <option key={index} value={reason}>{reason}</option>
    );
  }

  RenderTimelineFilters = (tb: listOfFonctionsInterface, index: number) => {
    return (
      <label key={index} className="timeline-filters-checkboxes">{tb.groupname} ({tb.total})
        <input className="checkboxinput" type="checkbox" 
          onChange={() => {this.props.onChangeCheckBox(index);}} 
          defaultChecked={this.checkFonctionDisplay(tb)} ></input>
        <span className="checkmark"></span>
      </label> 
    );
  };

  render() {
    return (
      <div className="timeline-filters">
        <h1 className="timeline-filters-title" id="title">Filtres</h1>
        <div className="timeline-filters-checkboxes">
          {this.props.listOfFonctions.map((tb: listOfFonctionsInterface, index: number) => 
            this.RenderTimelineFilters(tb, index))}
        </div>
        <div className="timeline-filters-search">Rechercher un nom : 
          <input onChange={e => this.props.onChangeName(e.target.value)} type="text" 
            className="timeline-filters-search-name"></input>
          <label className="timeline-filters-checkboxes">Masquer lignes vides
            <input className="checkboxinput" type="checkbox" 
              onChange={() => {this.props.onChangeEmptyField();}} defaultChecked={false}></input>
            <span className="checkmark"></span>
          </label>
        </div>
        <h1 className="timeline-filters-title" id="title">Absences</h1>
        <div className="timeline-filters-reason">
          <label htmlFor="reason">Motifs de l'absence: </label>
          <select name="reasons" id="reasonid" className="timeline-filters-select" 
            onChange={e => this.props.onChangeReason(e.target.value)}>
            {this.state.reasons.map((reason: string, index: number) => this.RenderAbsenceReasons(reason, index))}
          </select>
        </div>
      </div>
    );
  }
}

export default TimelineFilters;