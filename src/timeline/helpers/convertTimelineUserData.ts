import { TimelineDataUsers,
  TimelineGroup,
  GroupDisplay,
  TimelineItem,
} from '../index';
import { sortTimelineUsersByFonction } from '../helpers/databaseUserDataToTimelineData';
import moment from 'moment';

const sortAndListOfFonctions = (stateDisplayData: TimelineDataUsers, 
  stateListOfFonctions: GroupDisplay[]) => {
  let copyDisplayData = { ...stateDisplayData };

  copyDisplayData.groups.map((dpfonction: TimelineGroup) => {
    if (dpfonction.rightTitle === 'ERROR') {
      return 1;
    }
    
    dpfonction.rightTitle = addFonctionNameToFilters(dpfonction.rightTitle, stateListOfFonctions);

    return 0;
  });
  sortTimelineUsersByFonction(copyDisplayData.groups);

  return copyDisplayData;
};

const addFonctionNameToFilters = (tosearch: string, listOfFonctionsState: GroupDisplay[]) => {
  let listOfFonction = listOfFonctionsState;
  let copyOfOneItemFonction = { ...listOfFonction[0] };

  for (let i in listOfFonction) {
    if (listOfFonction[i].groupname === tosearch) {
      listOfFonction[i].total += 1;

      return tosearch;
    }
  }

  copyOfOneItemFonction.id = listOfFonction.length - 1;
  copyOfOneItemFonction.groupname = tosearch;
  copyOfOneItemFonction.total = 1;
  copyOfOneItemFonction.display = true;
  listOfFonction.push(copyOfOneItemFonction);

  return tosearch;
};

export const renderTimelineDisplaySeperateDays = (stateDisplayData: TimelineDataUsers) => {
  let listOfFunction: GroupDisplay[] = [];
  let newRenderDisplayTimeline: TimelineDataUsers = sortAndListOfFonctions(stateDisplayData, listOfFunction);
  let daysOfTimeline = newRenderDisplayTimeline.items;

  separateDays(stateDisplayData, daysOfTimeline);

  return { newRenderDisplayTimeline, listOfFunction };
};

const separateDays = (stateDisplayData: TimelineDataUsers, daysOfTimeline: TimelineItem[]) => {
  stateDisplayData.items.map((days: TimelineItem, index: number) => {
    if (days.group === -1) {
      return 1;
    }

    let newArrayLenghtOfItem = index + 1;
    let copyAndEditLastDisplayItem = { ...daysOfTimeline[index] };
    let newDateOfLastItem = copyAndEditLastDisplayItem.start_time;

    while (newDateOfLastItem < moment(days.end_time).startOf('day').add(1, 'days').valueOf()) {
      copyAndEditLastDisplayItem = { ...daysOfTimeline[newArrayLenghtOfItem - 1] };
      copyAndEditLastDisplayItem = editLastDisplayItem(copyAndEditLastDisplayItem, newDateOfLastItem, daysOfTimeline);
      newDateOfLastItem = moment(newDateOfLastItem).startOf('day').add(1, 'days').valueOf();
      copyAndEditLastDisplayItem.end_time = newDateOfLastItem;
      setWorkdays(days, copyAndEditLastDisplayItem);
      newArrayLenghtOfItem = daysOfTimeline.push(copyAndEditLastDisplayItem);
    }
    delete daysOfTimeline[index];

    return 0;
  });
};

const editLastDisplayItem = (
  copyAndEditLastDisplayItem: TimelineItem, newDateOfLastItem: number, daysOfTimeline: TimelineItem[]) => {
  copyAndEditLastDisplayItem.start_time = moment(newDateOfLastItem).startOf('day').valueOf();
  copyAndEditLastDisplayItem.id = daysOfTimeline.length + 1;

  return copyAndEditLastDisplayItem;
};

const setWorkdays = (days: TimelineItem, copyAndEditLastDisplayItem: TimelineItem) => {
  for (let j in days.workdays) {
    if (moment(copyAndEditLastDisplayItem.start_time).startOf('day').format('dddd') ===
        days.workdays[j]) {
      copyAndEditLastDisplayItem.state = days.state;
      break;
    } else {
      copyAndEditLastDisplayItem.state = 2;
    }
  }
};