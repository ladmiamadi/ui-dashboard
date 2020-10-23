import React, {Component} from 'react'
import moment from "moment"
import '../styles/TimelineFilters.css'

// TODO : change this by a class and add the display to state
const TimelineFilters = (props: any) => {
    const CheckTheCheckBox = (onetb:any) => {
        if (onetb.display === 1)
            return true
        else
            return false
    }

    const RenderTimelineFilters = props.groupslistall.map((tb: any, index: any) => {
        //console.log(tb);
        //onChange={() => {ToggleCheckBox(tb)}}
        return (
            <label key={index} className="TimelineFilters_Checkboxes">{tb.groupname}
            <input className="checkboxinput" type="checkbox" onChange={() => {props.onChange(index)}} defaultChecked={CheckTheCheckBox(tb)} ></input>
            <span className="checkmark"></span>
            </label> )
    })

        return (
            <div className="TimelineFilters">
                <h1 className="TimelineFilters_Title" id="Title">Filtres</h1>
                <div className="TimelineFilters_Checkboxes">
                    {RenderTimelineFilters}
                </div>
            </div>
        )
}

/*class TimelineFilters extends Component {
    CheckTheCheckBox = (onetb:any) => {
        if (onetb.display === 1)
            return true
        else
            return false
    }
    ToggleCheckBox = (onetb:any) => {
        if (onetb.display === 1)
            onetb.display = 0
        else
            onetb.display = 1
    }
    render() {
    const RenderTimelineFilters = this.props.groupslistall.map((tb: any, index: any) => {
        console.log(tb);
        
        return (
            <label key={index} className="TimelineFilters_Checkboxes">{tb.groupname}
            <input className="checkboxinput" type="checkbox" onChange={() => {this.ToggleCheckBox(tb)}} defaultChecked={this.CheckTheCheckBox(tb)} ></input>
            <span className="checkmark"></span>
            </label> )
    })

        return (
            <div className="TimelineFilters">
                <h1 className="TimelineFilters_Title" id="Title">Filtres</h1>
                <div className="TimelineFilters_Checkboxes">
                    {RenderTimelineFilters}
                </div>
            </div>
        )
    }
}*/

export default TimelineFilters