import { displayDataTimelineInterface, fonctionInterface, listOfFonctionsInterface, daysInterface } from '../index'
import { sortTimelineUsersByFonction } from "../helpers/getUserDataFromDB"
import moment from "moment"

let sortAndListOfFonctions = (stateDisplayData:displayDataTimelineInterface, 
  stateListOfFonctions:listOfFonctionsInterface[]) => {
    let copyDisplayData = {...stateDisplayData};

    copyDisplayData.Fonctions.map((dpfonction:fonctionInterface) => {
      if (dpfonction.rightTitle === "ERROR")
        return 1;
      dpfonction.rightTitle = addFonctionNameToFilters(dpfonction.rightTitle, stateListOfFonctions);

      return 0;
    })
    sortTimelineUsersByFonction(copyDisplayData.Fonctions);

    return copyDisplayData
}

let addFonctionNameToFilters = (tosearch:string, listOfFonctionsState:listOfFonctionsInterface[]) => {
    let listOfFonction = listOfFonctionsState;
    let copyOfOneItemFonction = {...listOfFonction[0]};

    for (let i in listOfFonction) {
      if (listOfFonction[i].groupname === tosearch) {
        listOfFonction[i].total += 1;

        return tosearch;
      }
    }
    copyOfOneItemFonction.id = listOfFonction.length-1;
    copyOfOneItemFonction.groupname = tosearch;
    copyOfOneItemFonction.total = 1;
    copyOfOneItemFonction.display = 1;
    listOfFonction.push(copyOfOneItemFonction);

    return tosearch;
}

export let renderTimelineDisplaySeperateDays = (stateDisplayData:displayDataTimelineInterface, 
  stateListOfFonctions:listOfFonctionsInterface[]) => {
    let newRenderDisplayTimeline = sortAndListOfFonctions(stateDisplayData, stateListOfFonctions)
    let daysOfTimeline = newRenderDisplayTimeline.Days;
    let copyAndEditLastDisplayItem = {...daysOfTimeline[0]};
    let newDateOfLastItem;
    let newArrayLenghtOfItem = 0;

    stateDisplayData.Days.map((days:daysInterface, index:number) => {
      if (days.group === -1)
        return 1;
      newArrayLenghtOfItem = index+1;
      copyAndEditLastDisplayItem = {...daysOfTimeline[index]};
      newDateOfLastItem = copyAndEditLastDisplayItem.start_time;

      while (newDateOfLastItem < moment(days.end_time).startOf('day').add(1, 'days').valueOf()) {
        copyAndEditLastDisplayItem = {...daysOfTimeline[newArrayLenghtOfItem-1]};
        copyAndEditLastDisplayItem.start_time = moment(newDateOfLastItem).startOf('day').valueOf();
        newDateOfLastItem = moment(newDateOfLastItem).startOf('day').add(1, 'days').valueOf();
        copyAndEditLastDisplayItem.end_time = newDateOfLastItem;
        copyAndEditLastDisplayItem.id = daysOfTimeline.length+1;
        for (let j in days.workdays) {
          if (moment(copyAndEditLastDisplayItem.start_time).startOf('day').format('dddd') === 
          days.workdays[j]) {
            copyAndEditLastDisplayItem.state = days.state;

            break;
          } else
            copyAndEditLastDisplayItem.state = 3;
        }
        newArrayLenghtOfItem = daysOfTimeline.push(copyAndEditLastDisplayItem);
      }
      delete daysOfTimeline[index]; // Works but may result in crash if we manipulate this later without check
      //daysOfTimeline.splice(index, 1) //This doesn't work really well...

      return 0;
    })
    return newRenderDisplayTimeline
}