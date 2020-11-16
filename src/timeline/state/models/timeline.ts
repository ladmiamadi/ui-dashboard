import { listOfFonctionsInterface, displayDataTimelineInterface, visibleTimeInterface } from '../../index'
import { createModel } from '@rematch/core';
import moment from 'moment';

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
    visibleTime: {
      start: moment().startOf('week').add(1, 'day').valueOf(),
      end: moment().startOf('week').add(1, 'week').add(1, 'day').valueOf(),
    },
    reason: 'Maladie',
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