import { TimelineVisibleTime } from '../index';
import moment from 'moment';

export const onPrevClick = (visibleTime: TimelineVisibleTime, 
  updateTimelineVisibleTime: (visibleTime: TimelineVisibleTime) => void) => {
  updateTimelineVisibleTime({
    start: moment(visibleTime.start).startOf('week').add(-1, 'week').add(1, 'days').valueOf(),
    end: moment(visibleTime.end).startOf('week').add(-1, 'week').add(1, 'days').valueOf(),
  });
};

export const onPrevClickMonth = (visibleTime: TimelineVisibleTime, 
  updateTimelineVisibleTime: (visibleTime: TimelineVisibleTime) => void) => {
  updateTimelineVisibleTime({
    start: moment(visibleTime.start)
      .startOf('week').add(-1, 'month').startOf('week').add(1, 'days').valueOf(),
    end: moment(visibleTime.end)
      .startOf('week').add(-1, 'month').startOf('week').add(1, 'days').valueOf(),
  });
};

export const onNextClick = (visibleTime: TimelineVisibleTime, 
  updateTimelineVisibleTime: (visibleTime: TimelineVisibleTime) => void) => {
  updateTimelineVisibleTime({
    start: moment(visibleTime.start).startOf('week').add(1, 'week').add(1, 'days').valueOf(),
    end: moment(visibleTime.end).startOf('week').add(1, 'week').add(1, 'days').valueOf(),
  });
};

export const onNextClickMonth = (visibleTime: TimelineVisibleTime, 
  updateTimelineVisibleTime: (visibleTime: TimelineVisibleTime) => void) => {
  updateTimelineVisibleTime({
    start: moment(visibleTime.start)
      .startOf('week').add(1, 'month').startOf('week').add(1, 'days').valueOf(),
    end: moment(visibleTime.end)
      .startOf('week').add(1, 'month').startOf('week').add(1, 'days').valueOf(),
  });
};