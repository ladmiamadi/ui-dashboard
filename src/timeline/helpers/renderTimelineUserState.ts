import { TimelineItem } from '../index';
import { REASONS_LIST, REASONS_LIST_COLOR } from '../constants/absence-reasons';

const daysRenderDisplayAbsenceReason = (days: TimelineItem) => {
  let result = 'red';

  REASONS_LIST.map((reason: string, index: number) => {

    if (reason === days.reason) {
      result = REASONS_LIST_COLOR[index];
    }

    return result;
  });

  return result;
};

export const daysRenderDisplayBackground = (days: TimelineItem) => {
  switch (days.state) {
  case 0:
    return 'green';
  case 1:
    return daysRenderDisplayAbsenceReason(days);
  default:
    return 'gray';
  }
};

export const daysRenderChangeStateBackground = (days: TimelineItem) => {
  switch (days.state) {
  case 0:
    days.state = 1;
    return daysRenderDisplayAbsenceReason(days);
  default:
    days.state = 0;
    return 'green';
  }
};

export const daysRenderChangeStateColor = (days: TimelineItem) => {
  if (days.reason === REASONS_LIST[0] && days.state === 1) {
    return 'black';
  } else {
    return 'white';
  }
};