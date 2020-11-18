import { listOfFonctionsInterface, displayDataTimelineInterface, visibleTimeInterface } from '../../index'
import { defaultVisibleTime, defaultAbsenceReason } from '../../helpers/initialise'
import { createModel } from '@rematch/core';

interface State {
  visibleTime: visibleTimeInterface,
  reason: string,
  searchName: string,
  displayEmptyField: boolean,
  timelineUsers: displayDataTimelineInterface,
  timelineFonctions: listOfFonctionsInterface[],
}

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
  } as State,

  reducers: {
    updateTimelineUsers: (state: State, payload: displayDataTimelineInterface): State => ({ ...state, timelineUsers: payload }),
    updateTimelineVisibleTime: (state: State, payload: visibleTimeInterface): State => ({ ...state, visibleTime: payload }),
    updateTimelineFonctions: (state: State, timelineFonctions: listOfFonctionsInterface[]): State => ({ ...state, timelineFonctions }),
    updateTimelineReason: (state: State, reason: string): State => ({ ...state, reason }),
    updateTimelineSearchName: (state: State, searchName: string): State => ({ ...state, searchName }),
    updateTimelineEmptyField: (state: State, displayEmptyField: boolean): State => ({ ...state, displayEmptyField }),
  },
});