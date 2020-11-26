import { GroupDisplay, TimelineDataUsers, TimelineVisibleTime, TimelineFilterData } from '../../index'
import { defaultVisibleTime, defaultAbsenceReason } from '../../helpers/defaultTimeline'
import { createModel } from '@rematch/core';
import { User } from '../../../app';
import { Toastify } from '../../../helpers/Toastify';
import { convertDBDataToTimelineData } from '../../helpers/databaseUserDataToTimelineData';
import { renderTimelineDisplaySeperateDays } from '../../helpers/convertTimelineUserData';

export const timeline = createModel({
  state: {
    visibleTime: defaultVisibleTime(),
    reason: defaultAbsenceReason(),
    searchName: '',
    displayEmptyField: true,
    timelineUsers: {
      groups: [],
      items: [],
    },
    timelineFonctions: [],
    isConverting: true,
  } as TimelineFilterData,

  reducers: {
    updateTimelineUsers: (state: TimelineFilterData, payload: TimelineDataUsers): TimelineFilterData => ({ ...state, timelineUsers: payload }),
    updateTimelineVisibleTime: (state: TimelineFilterData, payload: TimelineVisibleTime): TimelineFilterData => ({ ...state, visibleTime: payload }),
    updateTimelineFonctions: (state: TimelineFilterData, timelineFonctions: GroupDisplay[]): TimelineFilterData => ({ ...state, timelineFonctions }),
    updateTimelineReason: (state: TimelineFilterData, reason: string): TimelineFilterData => ({ ...state, reason }),
    updateTimelineSearchName: (state: TimelineFilterData, searchName: string): TimelineFilterData => ({ ...state, searchName }),
    updateTimelineEmptyField: (state: TimelineFilterData, displayEmptyField: boolean): TimelineFilterData => ({ ...state, displayEmptyField }),
    setisConverting: (state: TimelineFilterData, isConverting: boolean): TimelineFilterData => ({ ...state, isConverting }),
  },

  effects: {
    async initTimeline(users: User[]) {
      try {
        let listOfFonctions: GroupDisplay[] = [];
        let newdata = convertDBDataToTimelineData(users);
        let newDisplayData = renderTimelineDisplaySeperateDays(newdata, listOfFonctions);
        this.updateTimelineUsers(newDisplayData);
        this.updateTimelineFonctions(listOfFonctions);
      } catch(error) {
        (new Toastify()).error(`Unable to convert userDataFromDB to Timeline. ${ error.message }`);
      } finally {
        this.setisConverting(false);
      }
    },
  },
});