import { TimelineItem } from '../index'
import { absenceReasonList, absenceColorList } from '../constants/absenceReasons'

const daysRenderDisplayAbsenceReason = (days: TimelineItem) => {
    let result = "red";

    absenceReasonList.map((reason: string, index: number) => {
      if (reason === days.reason) {
        result = absenceColorList[index];
      }
      return result;
    })
    return result;
}

export const daysRenderDisplayBackground = (days: TimelineItem) => {
    switch (days.state) {
      case 0:
        return "green";
      case 1:
        return daysRenderDisplayAbsenceReason(days);
      default:
        return "gray";
    }
}

export const daysRenderChangeStateBackground = (days: TimelineItem) => {
    switch (days.state) {
      case 0:
        days.state = 1;
        return daysRenderDisplayAbsenceReason(days);
      default:
        days.state = 0;
        return "green";
    }
}

export const daysRenderChangeStateColor = (days: TimelineItem) => {
    if (days.reason === absenceReasonList[0] && days.state === 1)
      return "black";
    else
      return "white";
}