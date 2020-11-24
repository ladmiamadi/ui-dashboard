import { listOfFonctionsInterface, displayDataTimelineInterface, visibleTimeInterface, timelineFilters } from '../../index'
import { defaultVisibleTime, defaultAbsenceReason } from '../../helpers/defaultTimeline'
import { createModel } from '@rematch/core';

export const timeline = createModel({
  state: {
    visibleTime: defaultVisibleTime(),
    reason: defaultAbsenceReason(),
    searchName: '',
    displayEmptyField: true,
    timelineUsers: {
      Fonctions: [],
      Days: [],
    },
    timelineFonctions: [],
  } as timelineFilters,

  reducers: {
    updateTimelineUsers: (state: timelineFilters, payload: displayDataTimelineInterface): timelineFilters => ({ ...state, timelineUsers: payload }),
    updateTimelineVisibleTime: (state: timelineFilters, payload: visibleTimeInterface): timelineFilters => ({ ...state, visibleTime: payload }),
    updateTimelineFonctions: (state: timelineFilters, timelineFonctions: listOfFonctionsInterface[]): timelineFilters => ({ ...state, timelineFonctions }),
    updateTimelineReason: (state: timelineFilters, reason: string): timelineFilters => ({ ...state, reason }),
    updateTimelineSearchName: (state: timelineFilters, searchName: string): timelineFilters => ({ ...state, searchName }),
    updateTimelineEmptyField: (state: timelineFilters, displayEmptyField: boolean): timelineFilters => ({ ...state, displayEmptyField }),
  },
});