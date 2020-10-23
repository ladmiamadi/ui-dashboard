import React, {Component} from 'react'
import moment from "moment"
import '../styles/TimelineTitle.css'

class TimelineTitle extends Component{
    state = {
        timenow: (moment().format('MMMM Do YYYY, h:mm:ss'))
    }

    /*componentDidUpdate() {
        this.state.timenow = (moment().format('MMMM Do YYYY, h:mm:ss'))
    }*/

    render() {
        return (
            <div>
            <h1 className="TimelineTitle" id="Title">Timeline Stagiaire</h1>
            <h5 className="TimelineTitle">Dernière actualisation : {this.state.timenow}</h5>
            </div>
        )
    }
}

export default TimelineTitle