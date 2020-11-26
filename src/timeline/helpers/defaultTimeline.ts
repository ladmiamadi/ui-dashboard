import { TimelineVisibleTime } from '../index'
import moment from 'moment';

export const defaultVisibleTime = () => {
    let newVisibleTime: TimelineVisibleTime = {
        start: moment().startOf('week').add(1, 'day').valueOf(),
        end: moment().startOf('week').add(1, 'week').add(1, 'day').valueOf(),
    }

    return newVisibleTime;
}

export const defaultAbsenceReason = () => {
    return "Maladie";
}