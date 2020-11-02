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

    const SendFiltersName = (TimelineFiltersNameVALUE:any) => {
        props.onChangeName(TimelineFiltersNameVALUE)
    }

    const RenderTimelineFilters = props.listOfFonctions.map((tb: any, index: any) => {
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
                <div className="TimelineFiltersSearch">Rechercher un nom : 
                    <input onChange={e => SendFiltersName(e.target.value)} type="text" className="TimelineFiltersSearchName"></input>
                </div>
                <div className="TimelineFiltersReason">
                <label htmlFor="reason">Motifs de l'absence: </label>
                    <select name="reasons" id="reasonid" className="TimelineFiltersSelect" onChange={e => SendFiltersReason(e.target.value)}>
                        <option value="Maladie">Maladie</option>
                        <option value="Personnel">Personnel</option>
                        <option value="Non Justifiée">Non Justifiée</option>
                        <option value="Formation">Formation</option>
                        <option value="Retard">Retard</option>
                        <option value="Lacement">Lacement</option>
                    </select>
                </div>
            </div>
        )
}

export default TimelineFilters