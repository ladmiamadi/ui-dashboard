import React from 'react'
import '../styles/TimelineFilters.css'

// TODO : change this by a class and add the display to state
const TimelineFilters = (props: any) => {
    const CheckTheCheckBox = (onetb:any) => {
        if (onetb.display === 1)
            return true
        else
            return false
    }

    const SendFiltersReason = (TimelineFiltersReasonVALUE:any) => {
        props.onChangeReason(TimelineFiltersReasonVALUE)
    }

    const RenderTimelineFilters = props.listOfGroups.map((tb: any, index: any) => {
        return (
            <label key={index} className="TimelineFiltersCheckboxes">{tb.groupname} ({tb.total})
            <input className="checkboxinput" type="checkbox" onChange={() => {props.onChangeCheckBox(index)}} defaultChecked={CheckTheCheckBox(tb)} ></input>
            <span className="checkmark"></span>
            </label> )
    })

        return (
            <div className="TimelineFilters">
                <h1 className="TimelineFiltersTitle" id="Title">Filtres</h1>
                <div className="TimelineFiltersCheckboxes">
                    {RenderTimelineFilters}
                </div>
                <div className="TimelineFiltersReason">
                <label htmlFor="reason">Raison de l'absence: </label>
                    <select name="reasons" id="reasonid" onChange={e => SendFiltersReason(e.target.value)}>
                        <option value="Non Justifiée">Non Justifiée</option>
                        <option value="Personnel">Personnel</option>
                        <option value="Maladie">Maladie</option>
                    </select>
                </div>
                <div className="TimelineFiltersReason">Rechercher un nom : 
                    <input type="text" id="TimelineFiltersSearch" name="TimelineFiltersSearchName"></input>
                </div>
            </div>
        )
}

export default TimelineFilters