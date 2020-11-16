import moment from "moment"
import { User, UserJob } from '../../app';
import { fonctionInterface, daysInterface, displayDataTimelineInterface } from '../index'

const internshipPersonBase = [
  {
    id: -1,
    title: 'ERROR',
    groupLabelKey: "ERROR",
    rightTitle: 'ERROR',
    convention: 0,
  },
]

const internshipDateBase = [
  {
    id: -1,
    group: -1,
    title: 'Aucun Résultat trouvé, merci de verifier vos entrées dans le filtre',
    start_time: Number(moment().startOf('week')),
    end_time: Number(moment().startOf('week').add(1, 'week').add(1, 'day')),
    state: 0,
    reason: "ERROR",
    workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
},
]

export const sortTimelineUsersByFonction = (tosort:fonctionInterface[]) => {
  tosort.sort((a:fonctionInterface, b:fonctionInterface) => {
    let diff1 = a.rightTitle.toLowerCase(),
    diff2 = b.rightTitle.toLowerCase();

    if (diff1 < diff2)
        return -1;

    if (diff1 > diff2)
        return 1;

    return 0;
  });
}

const isWorkingOn = (person:UserJob) => {
  let workingdays = [];

  if (person.isWorkingOnMonday === true)
    workingdays.push("Monday");

  if (person.isWorkingOnTuesday === true)
    workingdays.push("Tuesday");

  if (person.isWorkingOnWednesday === true)
    workingdays.push("Wednesday");

  if (person.isWorkingOnThursday === true)
    workingdays.push("Thursday");

  if (person.isWorkingOnFriday === true)
    workingdays.push("Friday");

  if (person.isWorkingOnSaturday === true)
    workingdays.push("Saturday");

  if (person.isWorkingOnSunday === true)
    workingdays.push("Sunday");

  return workingdays;
}

const capitalizeFirstLetter = (tocap:string) => {
  return tocap.charAt(0).toUpperCase() + tocap.slice(1);
}

export let convertDBDataToTimelineData = (users:User[]) => {
  let copyBaseIntershipPerson:fonctionInterface;
  let copyBaseIntershipDate:daysInterface;
  let result:displayDataTimelineInterface;

  users.map((userdb:User) => {
    const hasworkinghours = userdb?.userJob?.workingHours
    copyBaseIntershipPerson = {...internshipPersonBase[internshipPersonBase.length-1]};
    copyBaseIntershipDate = {...internshipDateBase[internshipDateBase.length-1]};

    if (userdb.userJob && userdb.userProfiles && userdb.userJob.job) {
      copyBaseIntershipPerson.id += 1;
      copyBaseIntershipPerson.title = capitalizeFirstLetter(userdb.userProfiles[0].firstName);
      copyBaseIntershipPerson.groupLabelKey = capitalizeFirstLetter(userdb.userProfiles[0].lastName);
      copyBaseIntershipPerson.rightTitle = capitalizeFirstLetter(userdb.userJob.job.position);
      internshipPersonBase.push(copyBaseIntershipPerson);
      copyBaseIntershipDate.id += 1;
      copyBaseIntershipDate.group += 1;
      copyBaseIntershipDate.title = !hasworkinghours ? "none" : hasworkinghours;
      copyBaseIntershipDate.start_time = Number(moment(userdb.userJob.startDate).startOf('day'));
      copyBaseIntershipDate.end_time = Number(moment(userdb.userJob.endDate).startOf('day'));
      copyBaseIntershipDate.reason = "Maladie";
      copyBaseIntershipDate.workdays = isWorkingOn(userdb.userJob);
      internshipDateBase.push(copyBaseIntershipDate);
    }
    return 0;
  });
  result = {
    Fonctions: internshipPersonBase,
    Days: internshipDateBase
  };
  return result;
}