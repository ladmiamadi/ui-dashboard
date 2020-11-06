import moment from "moment"

export type DataGroups = {
  id: number,
  title: string,
  groupLabelKey: string,
  rightTitle: string,
  convention: number
}


export type DataItems = {
  id: number,
  group: string,
  title: string,
  start_time: number,
  end_time: number,
  state: number,
  workdays: any,
  reason: string
}

export const internshipPersonBase = [
  {
    id: -1,
    title: 'ERROR',
    groupLabelKey: "ERROR",
    rightTitle: 'ERROR',
    convention: 0,
  },
]

//export const internshipDateBase = [
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
      //------------------------
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

/*export let Groups:Array<DataGroups> = //export let Groups:ReadonlyArray<DataGroups>
[
    {
      id: 0,
      title: 'Pierre',
      groupLabelKey: "Carles",
      rightTitle: 'DEV',
      convention: 0,
    },
    {
      id: 1,
      title: 'Jackes',
      groupLabelKey: "Michelin",
      rightTitle: 'DEV',
      convention: 1,
    },
    {
      id: 2,
      title: 'Thomas',
      groupLabelKey: "Clemente",
      rightTitle: 'RH',
      convention: 2,
    },
    {
      id: 3,
      title: 'Alice',
      groupLabelKey: "Rudolf",
      rightTitle: 'DEV',
      convention: 3,
    },
    {
      id: 4,
      title: 'Paul',
      groupLabelKey: "Vandenghem",
      rightTitle: 'B2B',
      convention: 4,
    },
    {
      id: 5,
      title: 'Marc',
      groupLabelKey: "Louis",
      rightTitle: 'B2B',
      convention: 5,
    }
]

export let Items =
[
  {
    id: -1,
    group: -1,
    title: 'Aucun Résultat trouvé, merci de verifier vos entrées dans le filtre',
    start_time: Number(moment().startOf('week')),
    end_time: Number(moment().startOf('week').add(1, 'week').add(1, 'day')),
    state: 0,
    workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    reason: "ERROR"
},
    {
        id: 0,
        group: 0,
        title: '8h30 - 12h / 13h - 16h30',
        start_time: Number(moment().startOf('day').add(-3, 'days')),
        end_time: Number(moment().startOf('day').add(9, 'days')),
        state: 0,
        workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        reason: "Maladie"
    },
    {
        id: 1,
        group: 1,
        title: '8h45 - 12h / 13h - 16h45',
        start_time: Number(moment().startOf('day').add(-1, 'days')),
        end_time: Number(moment().startOf('day').add(7, 'days')),
        state: 0,
        workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        reason: "Maladie"
    },
    {
        id: 2,
        group: 2,
        title: '9h - 12h / 13h - 17h',
        start_time: Number(moment().startOf('day').add(-10, 'days')),
        end_time:  Number(moment().startOf('day').add(9, 'days')),
        state: 0,
        workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        reason: "Maladie"
    },
    {
        id: 3,
        group: 3,
        title: '8h - 12h / 13h - 16h',
        start_time: Number(moment().startOf('day').add(2, 'days')),
        end_time: Number(moment().startOf('day').add(13, 'days')),
        state: 1,
        workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        reason: "Maladie"
    },
    {
        id: 4,
        group: 4,
        title: '8h - 12h / 13h - 16h',
        start_time: Number(moment().startOf('day').add(-4, 'days')),
        end_time: Number(moment().startOf('day').add(16, 'days')),
        state: 0,
        workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        reason: "Maladie"
  },
  {
    id: 5,
    group: 5,
    title: '8h10 - 12h / 13h - 16h10',
    start_time: Number(moment().startOf('day').add(1, 'days')),
    end_time: Number(moment().startOf('day').add(16, 'days')),
    state: 0,
    workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    reason: "Maladie"
}
]*/

export default {Groups, Items}