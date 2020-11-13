import { daysInterface, listOfFonctionsInterface, displayDataTimelineInterface, fonctionInterface } from '../index'
import { renderTimelineAddErrorWhenNoResults, checkTimelineUserDataWithFilter } from '../helpers/checkTimelineUserData';
import { sortTimelineUsersByFonction } from '../helpers/getUserDataFromDB';

let daysRenderDisplayAbsenceReason = (days:daysInterface) => {
    switch (days.reason) {
      case "Maladie":
        return "orange";
      case "Personnel":
        return "gray";
      case "Non Justifiée":
        return "red";
      case "Formation":
        return "blue";
      case "Retard":
        return "brown";
      case "Déplacement":
        return "purple";
      default:
        return "red";
    }
}

export let daysRenderDisplayBackground = (days:daysInterface) => {
    switch (days.state) {
      case 0:
        return "green";
      case 1:
        return daysRenderDisplayAbsenceReason(days);
      default:
        return "gray";
    }
}

export let daysRenderChangeStateBackground = (days:daysInterface) => {
    switch (days.state) {
      case 0:
        days.state = 1;
        return daysRenderDisplayAbsenceReason(days);
      default:
        days.state = 0;
        return "green";
    }
}

export let daysRenderChangeStateColor = (days:daysInterface) => {
    if (days.reason === "Maladie" && days.state === 1)
      return "black";
    else
      return "white";
}

export let renderTimelineUpdateDisplayWithFilters = (toChangeOnName:string, timelineFonctions:listOfFonctionsInterface[], timelineUsers:displayDataTimelineInterface) => {
  let newRenderData:fonctionInterface[] = []

  newRenderData = checkTimelineUserDataWithFilter(newRenderData, 
    toChangeOnName, timelineUsers.Fonctions, timelineFonctions);
  renderTimelineAddErrorWhenNoResults(newRenderData);
  sortTimelineUsersByFonction(newRenderData);
  return newRenderData;
}