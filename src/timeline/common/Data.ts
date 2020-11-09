import moment from "moment"

export const internshipPersonBase = [
  {
    id: -1,
    title: 'ERROR',
    groupLabelKey: "ERROR",
    rightTitle: 'ERROR',
    convention: 0,
  },
]

export const internshipDateBase = [
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

const Groups = internshipPersonBase
const Items = internshipDateBase

export let sortDataArray = (tosort:any) => {
  tosort.sort((a:any, b:any) => {
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
}

let isWorkingOn = (person:any) => {
  let workingdays = []
  if (person.isWorkingOnMonday === true) {
    workingdays.push("Monday")
  }
  if (person.isWorkingOnTuesday === true) {
    workingdays.push("Tuesday")
  }
  if (person.isWorkingOnWednesday === true) {
    workingdays.push("Wednesday")
  }
  if (person.isWorkingOnThursday === true) {
    workingdays.push("Thursday")
  }
  if (person.isWorkingOnFriday === true) {
    workingdays.push("Friday")
  }
  if (person.isWorkingOnSaturday === true) {
    workingdays.push("Saturday")
  }
  if (person.isWorkingOnSunday === true) {
    workingdays.push("Sunday")
  }
  return workingdays;
}

let capitalizeFirstLetter = (tocap:string) => {
  return tocap.charAt(0).toUpperCase() + tocap.slice(1)
}

export let convertDataToTimeline = (users:any) => {
  let copyBaseIntershipPerson;
  let copyBaseIntershipDate;

  for (let i in users) {
    copyBaseIntershipPerson = {...internshipPersonBase[internshipPersonBase.length-1]};
    copyBaseIntershipDate = {...internshipDateBase[internshipDateBase.length-1]};
    if (users[i].userJob && users[i].userProfiles && users[i].userJob.job) {
      copyBaseIntershipPerson.id += 1;
      copyBaseIntershipPerson.title = capitalizeFirstLetter(users[i].userProfiles[0].firstName);
      copyBaseIntershipPerson.groupLabelKey = capitalizeFirstLetter(users[i].userProfiles[0].lastName);
      copyBaseIntershipPerson.rightTitle = capitalizeFirstLetter(users[i].userJob.job.position);
      internshipPersonBase.push(copyBaseIntershipPerson);
      copyBaseIntershipDate.id += 1;
      copyBaseIntershipDate.group += 1;
      copyBaseIntershipDate.title = users[i].userJob.workingHours;
      copyBaseIntershipDate.start_time = Number(moment(users[i].userJob.startDate).startOf('day'));
      copyBaseIntershipDate.end_time = Number(moment(users[i].userJob.endDate).startOf('day'));
      copyBaseIntershipDate.reason = "Maladie";
      copyBaseIntershipDate.workdays = isWorkingOn(users[i].userJob);
      internshipDateBase.push(copyBaseIntershipDate);
    }
  }
  console.log(internshipPersonBase);
  console.log(internshipDateBase);
}

export default {Groups, Items}