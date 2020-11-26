import { TimelineDataUsers, 
  TimelineGroup, 
  GroupDisplay, 
  TimelineItem,
} from '../index'
import { sortTimelineUsersByFonction } from "../helpers/databaseUserDataToTimelineData"
import moment from "moment"

const sortAndListOfFonctions = (stateDisplayData: TimelineDataUsers, 
  stateListOfFonctions: GroupDisplay[]) => {
    let copyDisplayData = {...stateDisplayData};

    copyDisplayData.groups.map((dpfonction: TimelineGroup) => {
      if (dpfonction.rightTitle === "ERROR") {
        return 1;
      }
      dpfonction.rightTitle = addFonctionNameToFilters(dpfonction.rightTitle, stateListOfFonctions);

      return 0;
    })
    sortTimelineUsersByFonction(copyDisplayData.groups);

    return copyDisplayData;
}

const addFonctionNameToFilters = (tosearch: string, listOfFonctionsState: GroupDisplay[]) => {
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

export const renderTimelineDisplaySeperateDays = (stateDisplayData: TimelineDataUsers, 
  stateListOfFonctions: GroupDisplay[]) => {
    let newRenderDisplayTimeline = sortAndListOfFonctions(stateDisplayData, stateListOfFonctions)
    let daysOfTimeline = newRenderDisplayTimeline.items;
    let copyAndEditLastDisplayItem = {...daysOfTimeline[0]};
    let newDateOfLastItem;
    let newArrayLenghtOfItem = 0;

    stateDisplayData.items.map((days: TimelineItem, index: number) => {
      if (days.group === -1) {
        return 1;
      }
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
      delete daysOfTimeline[index];

      return 0;
    })
    return newRenderDisplayTimeline
}