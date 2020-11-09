import { sortDataArray } from "../common/Data"
import moment from "moment"
import Data from "../common/Data"

let sortAndListOfFonctions = (stateDisplayData:any, stateListOfFonctions:any) => {
    let copyDisplayData = {...stateDisplayData};

    for (let i in copyDisplayData.Fonctions) {
      if (copyDisplayData.Fonctions[i].rightTitle === "ERROR")
        continue;
      copyDisplayData.Fonctions[i].rightTitle = addFonctionNameToFilters(copyDisplayData.Fonctions[i].rightTitle, 
        stateListOfFonctions);
    }
    sortDataArray(copyDisplayData.Fonctions);
    return copyDisplayData
}

let addFonctionNameToFilters = (tosearch:string, listOfFonctionsState:any) => {
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

export let convertTimelineToMultipleDaysRemote = (stateDisplayData:any, stateListOfFonctions:any) => {
    let copyDisplayData = sortAndListOfFonctions(stateDisplayData, stateListOfFonctions)
    let DisplayDataDays = copyDisplayData.Days;
    let copyAndEditLastDisplayItem = {...DisplayDataDays[0]};
    let endDateOfItem;
    let newDateOfLastItem;
    let newArrayLenghtOfItem = 0;
    
    for (let i in Data.Items) {
      if (Data.Items[i].group === -1)
        continue;
      newArrayLenghtOfItem = Number(i)+1;
      endDateOfItem = Data.Items[i].end_time;
      copyAndEditLastDisplayItem = {...DisplayDataDays[i]};
      newDateOfLastItem = copyAndEditLastDisplayItem.start_time;

      while (newDateOfLastItem < Number(moment(endDateOfItem).startOf('day').add(1, 'days'))) {
        copyAndEditLastDisplayItem = {...DisplayDataDays[newArrayLenghtOfItem-1]};
        copyAndEditLastDisplayItem.start_time = Number(moment(newDateOfLastItem).startOf('day'));
        newDateOfLastItem = Number(moment(newDateOfLastItem).startOf('day').add(1, 'days'));
        copyAndEditLastDisplayItem.end_time = newDateOfLastItem;
        copyAndEditLastDisplayItem.id = DisplayDataDays.length+1;
        for (let j in Data.Items[i].workdays) {
          if (moment(copyAndEditLastDisplayItem.start_time).startOf('day').format('dddd') === 
          Data.Items[i].workdays[j]) {
            copyAndEditLastDisplayItem.state = Data.Items[i].state;
            break;
          }
          else
            copyAndEditLastDisplayItem.state = 3;
        }
        newArrayLenghtOfItem = DisplayDataDays.push(copyAndEditLastDisplayItem);
      }
      delete DisplayDataDays[Number(i)]; // Works but may result in crash if we manipulate this later without check
      //DisplayDataDays.splice(Number(i), 1) //This doesn't work really well...
    }    
    return copyDisplayData
}