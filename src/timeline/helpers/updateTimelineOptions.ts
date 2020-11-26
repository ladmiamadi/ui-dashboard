import {
  TimelineFilterData,
    timelineOptionsPropsInterface
  } from '../index';
import { renderTimelineUpdateDisplayWithFilters } from '../helpers/renderTimelineUserData';

export const toggleCheckBox = (timelineOptionProps: timelineOptionsPropsInterface, onetable: number) => {
    let listOfFonction = [...timelineOptionProps.timeline.timelineFonctions];
    let timelineFilters: TimelineFilterData = {
      reason: timelineOptionProps.timeline.reason,
      searchName: timelineOptionProps.timeline.searchName,
      displayEmptyField: timelineOptionProps.timeline.displayEmptyField,
      visibleTime: timelineOptionProps.timeline.visibleTime,
      timelineFonctions: listOfFonction,
      timelineUsers: timelineOptionProps.timeline.timelineUsers,
      isConverting: false,
    };

    if (listOfFonction[onetable].display === 0) {
      listOfFonction[onetable].display = 1;
    } else {
      listOfFonction[onetable].display = 0;
    }
    renderTimelineUpdateDisplayWithFilters(timelineFilters);
    timelineOptionProps.updateTimelineFonctions(listOfFonction);
  }

export const updateSearchTherms = (timelineOptionProps: timelineOptionsPropsInterface, nametochange: string) => {
    const timelineFilters: TimelineFilterData = {
      reason: timelineOptionProps.timeline.reason,
      searchName: nametochange,
      displayEmptyField: timelineOptionProps.timeline.displayEmptyField,
      visibleTime: timelineOptionProps.timeline.visibleTime,
      timelineFonctions: timelineOptionProps.timeline.timelineFonctions,
      timelineUsers: timelineOptionProps.timeline.timelineUsers,
      isConverting: false,
    };
    timelineOptionProps.updateTimelineSearchName(nametochange);
    renderTimelineUpdateDisplayWithFilters(timelineFilters);
  }

export const toggleEmptyFields = (timelineOptionProps: timelineOptionsPropsInterface) => {
    let timelineFilters: TimelineFilterData = {
      reason: timelineOptionProps.timeline.reason,
      searchName: timelineOptionProps.timeline.searchName,
      displayEmptyField: timelineOptionProps.timeline.displayEmptyField,
      visibleTime: timelineOptionProps.timeline.visibleTime,
      timelineFonctions: timelineOptionProps.timeline.timelineFonctions,
      timelineUsers: timelineOptionProps.timeline.timelineUsers,
      isConverting: false,
    };

    if (timelineOptionProps.timeline.displayEmptyField) {
        timelineOptionProps.updateTimelineEmptyField(false);
      timelineFilters.displayEmptyField = false;
    } else {
        timelineOptionProps.updateTimelineEmptyField(true);
      timelineFilters.displayEmptyField = true;
    }
    renderTimelineUpdateDisplayWithFilters(timelineFilters);
  }