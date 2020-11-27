import { TimelineGroup, GroupDisplay, TimelineFilterData } from '../index';

export const renderTimelineAddErrorWhenNoResults = (
  copyDisplayData: TimelineGroup[], timelineFilters: TimelineFilterData)=> {
  const noResultFonctions = 
  {
    id: -1,
    title: 'NO RESULT',
    groupLabelKey: 'NO RESULT',
    rightTitle: 'ERROR',
    display: 1,
    convention: 0,
  };

  changeErrorVisibleTime(timelineFilters);
  if (copyDisplayData.length === 0) {
    copyDisplayData.push(noResultFonctions);
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
  if (timelineFilters.timelineUsers.items.length <= 1) {
    return 0;
  }

  timelineFilters.timelineUsers.items[0].start_time = timelineFilters.visibleTime.start;
  timelineFilters.timelineUsers.items[0].end_time = timelineFilters.visibleTime.end;
};

export const checkTimelineUserDataWithFilter = (timelineFilters: TimelineFilterData) => {
  let newTimelineDisplay: TimelineGroup[] = [];

  timelineFilters.timelineFonctions.map((tb: GroupDisplay) => {
    tb.total = 0;

    return 0;
  });
  timelineFilters.timelineUsers.groups.map((displayData: TimelineGroup) => {
    timelineFilters.timelineFonctions.map((fonctionData: GroupDisplay) => {
      if (fonctionData.display && fonctionData.groupname === displayData.rightTitle &&
          isFonctionVisibleOnTimeline(timelineFilters, displayData))
        if (displayData.title.toLowerCase().includes(timelineFilters.searchName.toLowerCase()) || 
          displayData.groupLabelKey.toLowerCase().includes(timelineFilters.searchName.toLowerCase())) {
          fonctionData.total += 1;
          newTimelineDisplay.push(displayData);
        }

      return 0;
    });

    return 0;
  });

  return newTimelineDisplay;
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