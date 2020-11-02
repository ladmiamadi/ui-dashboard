import React from 'react'
import '../styles/TimelineInfo.css'

// TODO : change this by a class and add the display to state
const TimelineInfo = (props: any) => {
    const undef = "UNDEFINED"

        return (
            <div className="TimelineInfo">
                <h1 className="TimelineInfoTitle" id="Title">Information</h1>
                <div className="TimelineInfoContent">
                    <div className="TimelineInfoPerson">
                        <p>Prénom : {undef}</p>
                        <p>Nom : {undef}</p>
                        <p>Durée Stage : {undef}</p>
                    </div>
                    <div className="TimelineInfoDates">
                        <p>Moi Début : {undef}</p>
                        <p>Date Début Stage : {undef}</p>
                        <p>Date Fin Stage : {undef}</p>
                    </div>
                    <div className="TimelineInfoState">
                        <p>Progression de la Convention: </p>
                        <label className="TimelineInfoCheckboxes">(1/5) Recu 
                        <input className="checkboxinput" type="checkbox"></input>
                        <span className="checkmark"></span></label>
                        <label className="TimelineInfoCheckboxes">(2/5) Complet 
                        <input className="checkboxinput" type="checkbox"></input>
                        <span className="checkmark"></span></label>
                        <label className="TimelineInfoCheckboxes">(3/5) Verifié 
                        <input className="checkboxinput" type="checkbox"></input>
                        <span className="checkmark"></span></label>
                        <label className="TimelineInfoCheckboxes">(4/5) Attente 
                        <input className="checkboxinput" type="checkbox"></input>
                        <span className="checkmark"></span></label>
                        <label className="TimelineInfoCheckboxes">(5/5) Signée 
                        <input className="checkboxinput" type="checkbox"></input>
                        <span className="checkmark"></span></label>
                    </div>
                </div>
            </div>
        )
}

export default TimelineInfo