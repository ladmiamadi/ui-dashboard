import {
  GroupDisplay,
  TimelineFilterData,
} from '../index';
import { renderTimelineUpdateDisplayWithFilters } from '../helpers/renderTimelineUserData';

export const toggleCheckBox = (
  updateTimelineFonctions: (timelineFonctions: GroupDisplay[]) => void,
  timeline: TimelineFilterData, onetable: number) => {
  let listOfFonction = [...timeline.timelineFonctions];
  let timelineFilters: TimelineFilterData = {
    ...timeline,
    timelineFonctions: listOfFonction,
  };

  listOfFonction[onetable].display = !listOfFonction[onetable].display;
  renderTimelineUpdateDisplayWithFilters(timelineFilters);
  updateTimelineFonctions(listOfFonction);
};

export const updateSearchTherms = (
  updateTimelineSearchName: (searchName: string) => void, timeline: TimelineFilterData, nametochange: string) => {
  const timelineFilters: TimelineFilterData = {
    ...timeline,
    searchName: nametochange,
    isConverting: false,
  };

  updateTimelineSearchName(nametochange);
  renderTimelineUpdateDisplayWithFilters(timelineFilters);
};

export const toggleEmptyFields = (
  updateTimelineEmptyField: (displayEmptyField: boolean) => void, timeline: TimelineFilterData) => {
  let timelineFilters: TimelineFilterData = {
    ...timeline,
  };

  if (timeline.displayEmptyField) {
    updateTimelineEmptyField(false);
    timelineFilters.displayEmptyField = false;
  } else {
    updateTimelineEmptyField(true);
    timelineFilters.displayEmptyField = true;
  }

  renderTimelineUpdateDisplayWithFilters(timelineFilters);
};