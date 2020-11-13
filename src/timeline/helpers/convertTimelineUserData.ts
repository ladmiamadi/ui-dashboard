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
    let copyDisplayData = sortAndListOfFonctions(stateDisplayData, stateListOfFonctions)
    let DisplayDataDays = copyDisplayData.Days;
    let copyAndEditLastDisplayItem = {...DisplayDataDays[0]};
    let endDateOfItem;
    let newDateOfLastItem;
    let newArrayLenghtOfItem = 0;

    stateDisplayData.Days.map((days:daysInterface, index:number) => {
      if (days.group === -1)
        return 1;
      newArrayLenghtOfItem = index+1;
      endDateOfItem = days.end_time;
      copyAndEditLastDisplayItem = {...DisplayDataDays[index]};
      newDateOfLastItem = copyAndEditLastDisplayItem.start_time;

      while (newDateOfLastItem < moment(endDateOfItem).startOf('day').add(1, 'days').valueOf()) {
        copyAndEditLastDisplayItem = {...DisplayDataDays[newArrayLenghtOfItem-1]};
        copyAndEditLastDisplayItem.start_time = moment(newDateOfLastItem).startOf('day').valueOf();
        newDateOfLastItem = moment(newDateOfLastItem).startOf('day').add(1, 'days').valueOf();
        copyAndEditLastDisplayItem.end_time = newDateOfLastItem;
        copyAndEditLastDisplayItem.id = DisplayDataDays.length+1;
        for (let j in days.workdays) {
          if (moment(copyAndEditLastDisplayItem.start_time).startOf('day').format('dddd') === 
          days.workdays[j]) {
            copyAndEditLastDisplayItem.state = days.state;
            break;
          }
          else
            copyAndEditLastDisplayItem.state = 3;
        }
        newArrayLenghtOfItem = DisplayDataDays.push(copyAndEditLastDisplayItem);
      }
      delete DisplayDataDays[index]; // Works but may result in crash if we manipulate this later without check
      //DisplayDataDays.splice(index, 1) //This doesn't work really well...
      return 0;
    })
    return copyDisplayData
}