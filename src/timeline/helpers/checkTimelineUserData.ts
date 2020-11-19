import { fonctionInterface, listOfFonctionsInterface, timelineFiltersInterface } from '../index'

export const renderTimelineAddErrorWhenNoResults = (copyDisplayData: fonctionInterface[], timelineFilters: timelineFiltersInterface)=> {
  let noResultFonctions =     
  {
    id: -1,
    title: 'NO RESULT',
    groupLabelKey: "NO RESULT",
    rightTitle: 'ERROR',
    display: 1,
    convention: 0,
  }

  changeErrorVisibleTime(timelineFilters);
  if (copyDisplayData.length === 0) {
    copyDisplayData.push(noResultFonctions);
  } else {
    copyDisplayData.map((dpdata:fonctionInterface, index:number) => {
      if (dpdata.rightTitle === 'ERROR') {
       copyDisplayData.splice(index, 1);
      }
      return 0;
    });
  }
}

const changeErrorVisibleTime = (timelineFilters: timelineFiltersInterface) => {
  if (timelineFilters.timelineUsers.Days.length <= 1) {
    return 0;
  }
  
  timelineFilters.timelineUsers.Days[0].start_time = timelineFilters.visibleTime.start;
  timelineFilters.timelineUsers.Days[0].end_time = timelineFilters.visibleTime.end;
}

export const checkTimelineUserDataWithFilter = (timelineFilters: timelineFiltersInterface) => {
    let newTimelineDisplay: fonctionInterface[] = []

    timelineFilters.timelineFonctions.map((tb: listOfFonctionsInterface) => {
      tb.total = 0;

      return 0;
    });
    timelineFilters.timelineUsers.Fonctions.map((displayData: fonctionInterface) => {
      timelineFilters.timelineFonctions.map((fonctionData: listOfFonctionsInterface) => {
        if (fonctionData.display === 1 && fonctionData.groupname === displayData.rightTitle && 
          isEmptyFonctionOfVisibleTimeline(timelineFilters, displayData))
          if (displayData.title.toLowerCase().includes(timelineFilters.searchName.toLowerCase()) || 
          displayData.groupLabelKey.toLowerCase().includes(timelineFilters.searchName.toLowerCase())) {
            fonctionData.total += 1
            newTimelineDisplay.push(displayData)
          }
          return 0;
        });
        return 0;
      });
    return newTimelineDisplay;
}

const isEmptyFonctionOfVisibleTimeline = (timelineFilters: timelineFiltersInterface, currentFonction: fonctionInterface) => {

  if (timelineFilters.displayEmptyField) {
    return true;
  }
  for (let i in timelineFilters.timelineUsers.Days) {
    if (timelineFilters.timelineUsers.Days[i].group === currentFonction.id) {
      if ((timelineFilters.timelineUsers.Days[i].end_time >= timelineFilters.visibleTime.start && 
        timelineFilters.timelineUsers.Days[i].end_time <= timelineFilters.visibleTime.start) || (
        timelineFilters.timelineUsers.Days[i].start_time >= timelineFilters.visibleTime.end && 
        timelineFilters.timelineUsers.Days[i].start_time <= timelineFilters.visibleTime.end))
        return true;
    }
  }
  return false;
}