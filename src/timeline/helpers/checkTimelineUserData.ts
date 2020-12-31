import { TimelineGroup, GroupDisplay, TimelineFilterData } from '../index';
import { NO_RESULT_GROUP } from '../constants/timeline-item';

export const renderTimelineAddErrorWhenNoResults = (
  copyDisplayData: TimelineGroup[], timelineFilters: TimelineFilterData) => {
  changeErrorVisibleTime(timelineFilters);

  if (copyDisplayData.length === 0) {
    copyDisplayData.push(NO_RESULT_GROUP);
  } else {
    copyDisplayData.map((dpdata: TimelineGroup, index: number) => {

      if (dpdata.rightTitle === 'ERROR') {
        copyDisplayData.splice(index, 1);
      }

      return 0;
    });
  }
};

const changeErrorVisibleTime = (timelineFilters: TimelineFilterData) => {
  if (timelineFilters.timelineUsers.items.length > 0) {
    timelineFilters.timelineUsers.items[0].start_time = timelineFilters.visibleTime.start;
    timelineFilters.timelineUsers.items[0].end_time = timelineFilters.visibleTime.end;
  }
};

export const checkTimelineUserDataWithFilter = (timelineFilters: TimelineFilterData) => {
  let newTimelineDisplay: TimelineGroup[] = [];

  timelineFilters.timelineFonctions.map((tb: GroupDisplay) => tb.total = 0);
  timelineFilters.timelineUsers.groups.map((displayData: TimelineGroup) => {
    timelineFilters.timelineFonctions.map((fonctionData: GroupDisplay) => {

      if (renderThisGroup(displayData, fonctionData, timelineFilters)) {
        fonctionData.total += 1;
        newTimelineDisplay.push(displayData);
      }

      return fonctionData;
    });

    return displayData;
  });

  return newTimelineDisplay;
};

const renderThisGroup = (dispData: TimelineGroup, fonctionData: GroupDisplay, timelineFilters: TimelineFilterData) => {
  return fonctionData.display && fonctionData.groupname === dispData.rightTitle &&
      isFonctionVisibleOnTimeline(timelineFilters, dispData) && (nameIsEqualToSearch(dispData, timelineFilters));
};

const nameIsEqualToSearch = (displayData: TimelineGroup, timelineFilters: TimelineFilterData) => {
  return displayData.title.toLowerCase().includes(timelineFilters.searchName.toLowerCase()) ||
      displayData.groupLabelKey.toLowerCase().includes(timelineFilters.searchName.toLowerCase());
};

const isFonctionVisibleOnTimeline = (timelineFilters: TimelineFilterData, currentFonction: TimelineGroup) => {

  if (timelineFilters.displayEmptyField) {
    return true;
  }

  for (let i in timelineFilters.timelineUsers.items) {

    if (timelineFilters.timelineUsers.items[i].group === currentFonction.id) {

      if ((timelineFilters.timelineUsers.items[i].end_time >= timelineFilters.visibleTime.start && 
        timelineFilters.timelineUsers.items[i].end_time <= timelineFilters.visibleTime.start) || (
        timelineFilters.timelineUsers.items[i].start_time >= timelineFilters.visibleTime.end && 
        timelineFilters.timelineUsers.items[i].start_time <= timelineFilters.visibleTime.end))

        return true;
    }
  }

  return false;
};