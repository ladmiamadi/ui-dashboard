import React from 'react';
import '../styles/TimelineFilters.css';

const TimelineFilters = (props: any) => {
  const CheckTheCheckBox = (onetb:any) => {
    if (onetb.display === 1)
      return true;
    else
      return false;
  };

  const SendFiltersReason = (TimelineFiltersReasonVALUE:any) => {
    props.onChangeReason(TimelineFiltersReasonVALUE);
  };

  const SendFiltersName = (TimelineFiltersNameVALUE:any) => {
    props.onChangeName(TimelineFiltersNameVALUE);
  };

  const RenderTimelineFilters = props.listOfFonctions.map((tb: any, index: any) => {
    return (
      <label key={index} className="timeline-filters-checkboxes">{tb.groupname} ({tb.total})
        <input className="checkboxinput" type="checkbox" 
          onChange={() => {props.onChangeCheckBox(index);}} defaultChecked={CheckTheCheckBox(tb)} ></input>
        <span className="checkmark"></span>
      </label> );
  });

  return (
    <div className="timeline-filters">
      <h1 className="timeline-filters-title" id="title">Filtres</h1>
      <div className="timeline-filters-checkboxes">
        {RenderTimelineFilters}
      </div>
      <div className="timeline-filters-search">Rechercher un nom : 
        <input onChange={e => SendFiltersName(e.target.value)} type="text" 
          className="timeline-filters-search-name"></input>
      </div>
      <div className="timeline-filters-reason">
        <label htmlFor="reason">Motifs de l'absence: </label>
        <select name="reasons" id="reasonid" className="timeline-filters-select" 
          onChange={e => SendFiltersReason(e.target.value)}>
          <option value="Maladie">Maladie</option>
          <option value="Personnel">Personnel</option>
          <option value="Non Justifiée">Non Justifiée</option>
          <option value="Formation">Formation</option>
          <option value="Retard">Retard</option>
          <option value="Déplacement">Déplacement</option>
        </select>
      </div>
    </div>
  );
};

export default TimelineFilters;