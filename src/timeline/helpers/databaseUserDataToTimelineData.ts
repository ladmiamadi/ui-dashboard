import moment from 'moment';
import { User, UserJob } from '../../app';
import { TimelineGroup, TimelineDataUsers } from '../index';
import { defaultVisibleTime } from './defaultTimeline';

const internshipPersonBase = [
  {
    id: -1,
    title: 'ERROR',
    groupLabelKey: 'ERROR',
    rightTitle: 'ERROR',
    convention: 0,
  },
];

const errorVisibleTime = defaultVisibleTime();

const internshipDateBase = [
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

export const sortTimelineUsersByFonction = (tosort: TimelineGroup[]) => {
  tosort.sort((a: TimelineGroup, b: TimelineGroup) => {

    let diff1 = a.rightTitle.toLowerCase(),
      diff2 = b.rightTitle.toLowerCase();

    if (diff1 < diff2) {
      return -1;
    }

    if (diff1 > diff2) {
      return 1;
    }

    return 0;
  });
};

const isWorkingOn = (person: UserJob) => {
  let workingdays = [];

  if (person.isWorkingOnMonday) {
    workingdays.push('Monday');
  }

  if (person.isWorkingOnTuesday) {
    workingdays.push('Tuesday');
  }

  if (person.isWorkingOnWednesday) {
    workingdays.push('Wednesday');
  }

  if (person.isWorkingOnThursday) {
    workingdays.push('Thursday');
  }

  if (person.isWorkingOnFriday) {
    workingdays.push('Friday');
  }

  if (person.isWorkingOnSaturday) {
    workingdays.push('Saturday');
  }

  if (person.isWorkingOnSunday) {
    workingdays.push('Sunday');
  }

  return workingdays;
};

const capitalizeFirstLetter = (tocap: string) => {
  return tocap.charAt(0).toUpperCase() + tocap.slice(1);
};

export const convertDBDataToTimelineData = (users:User[]) => {
  let result: TimelineDataUsers;

  users.map((userdb: User) => {

    if (userdb.userJob && userdb.userProfiles && userdb.userJob.job) {
      internshipPersonBase.push(convertDBFonctionToTimelineFonction(userdb));
      internshipDateBase.push(convertDBDaysToTimelineDays(userdb));
    }

    return 0;
  });

  result = {
    groups: internshipPersonBase,
    items: internshipDateBase,
  };

  return result;
};

const convertDBFonctionToTimelineFonction = (userdb: User) => {
  let copyBaseIntershipPerson = { ...internshipPersonBase[internshipPersonBase.length - 1] };
  
  if (userdb.userJob && userdb.userProfiles && userdb.userJob.job) {
    copyBaseIntershipPerson = { ...internshipPersonBase[internshipPersonBase.length - 1] };
    copyBaseIntershipPerson.id += 1;
    copyBaseIntershipPerson.title = capitalizeFirstLetter(userdb.userProfiles[0].firstName);
    copyBaseIntershipPerson.groupLabelKey = capitalizeFirstLetter(userdb.userProfiles[0].lastName);
    copyBaseIntershipPerson.rightTitle = capitalizeFirstLetter(userdb.userJob.job.position);
  }

  return copyBaseIntershipPerson;
};

const convertDBDaysToTimelineDays = (userdb: User) => {
  let copyBaseIntershipDate = { ...internshipDateBase[internshipDateBase.length - 1] };
  const hasWorkingHours = userdb?.userJob?.workingHours;
  
  if (userdb.userJob && userdb.userProfiles && userdb.userJob.job) {
    copyBaseIntershipDate.id += 1;
    copyBaseIntershipDate.group += 1;
    copyBaseIntershipDate.title = !hasWorkingHours ? 'undefined' : hasWorkingHours;
    copyBaseIntershipDate.start_time = moment(userdb.userJob.startDate).startOf('day').valueOf();
    copyBaseIntershipDate.end_time = moment(userdb.userJob.endDate).startOf('day').valueOf();
    copyBaseIntershipDate.reason = 'Maladie';
    copyBaseIntershipDate.workdays = isWorkingOn(userdb.userJob);
  }

  return copyBaseIntershipDate;
};