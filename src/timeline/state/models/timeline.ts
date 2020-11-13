import { listOfFonctionsInterface, displayDataTimelineInterface } from '../../index'
import { createModel } from '@rematch/core';
import moment from 'moment';

interface State {
  visibleTimeStart: number,
  visibleTimeEnd: number,
  reason: string,
  searchName: string,
  timelineUsers: displayDataTimelineInterface,
  timelineFonctions: listOfFonctionsInterface[],
}

export const timeline = createModel({
  state: {
    visibleTimeStart: moment().startOf('week').add(1, 'day').valueOf(),
    visibleTimeEnd: moment().startOf('week').add(1, 'week').add(1, 'day').valueOf(),
    reason: 'Maladie',
    searchName: '',
    timelineUsers: {
      Fonctions: [],
      Days: [],
    },
    timelineFonctions: [],
  } as State,

  reducers: {
    //updateTimelineUsers: (state: State, timelineUsers: displayDataTimelineInterface): State => ({ ...state, timelineUsers }),
    updateTimelineUsers: (state: State, payload: displayDataTimelineInterface): State => ({ ...state, timelineUsers: payload }),
    updateTimelineFonctions: (state: State, timelineFonctions: listOfFonctionsInterface[]): State => ({ ...state, timelineFonctions }),
    updateTimelineVisibleTimeStart: (state: State, visibleTimeStart: number): State => ({ ...state, visibleTimeStart }),
    updateTimelineVisibleTimeEnd: (state: State, visibleTimeEnd: number): State => ({ ...state, visibleTimeEnd }),
    updateTimelineReason: (state: State, reason: string): State => ({ ...state, reason }),
    updateTimelineSearchName: (state: State, searchName: string): State => ({ ...state, searchName }),
  },
});