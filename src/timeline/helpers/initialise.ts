import { visibleTimeInterface } from '../index'
import moment from 'moment';

export const defaultVisibleTime = () => {
    let newVisibleTime: visibleTimeInterface = {
        start: moment().startOf('week').add(1, 'day').valueOf(),
        end: moment().startOf('week').add(1, 'week').add(1, 'day').valueOf(),
    }

    return newVisibleTime;
}

export const defaultAbsenceReason = () => {
    return "Maladie";
}