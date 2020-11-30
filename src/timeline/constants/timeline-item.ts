import { defaultVisibleTime } from '../helpers/defaultTimeline';

export const TIMELINE_ITEM_CONTENT = [
  { itemName: 'title', prefix: '', suffix: '' },
  { itemName: 'reason', prefix: 'ABSENT(', suffix: ')' },
  { itemName: '', prefix: 'FERIE', suffix: '' },
];

export const NO_RESULT_GROUP = {
  id: -1,
  title: 'NO RESULT',
  groupLabelKey: 'NO RESULT',
  rightTitle: 'ERROR',
  display: 1,
  convention: 0,
};

const errorVisibleTime = defaultVisibleTime();

export const INTERNSHIP_DATE_BASE = [
  {
    id: -1,
    group: -1,
    title: 'Aucun Résultat trouvé pour cette semaine, verifier vos entrées dans le filtre',
    start_time: errorVisibleTime.start,
    end_time: errorVisibleTime.end,
    state: 0,
    reason: 'ERROR',
    workdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    itemProps: '',
  },
];

export const INTERSHIP_PERSON_BASE = [
  {
    id: -1,
    title: 'ERROR',
    groupLabelKey: 'ERROR',
    rightTitle: 'ERROR',
    convention: 0,
  },
];

export const IS_WORKING_TO_DAYS = [
  { workingDay: 'isWorkingOnMonday', day: 'Monday' },
  { workingDay: 'isWorkingOnTuesday', day: 'Tuesday' },
  { workingDay: 'isWorkingOnWednesday', day: 'Wednesday' },
  { workingDay: 'isWorkingOnThursday', day: 'Thursday' },
  { workingDay: 'isWorkingOnFriday', day: 'Friday' },
  { workingDay: 'isWorkingOnSaturday', day: 'Saturday' },
  { workingDay: 'isWorkingOnSunday', day: 'Sunday' },
];