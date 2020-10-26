import moment from "moment"

// Old datagroup
/*export type DataGroups = {
    id: number,
    firstname: string,
    lastname: string,
    job: string
}*/

export type DataGroups = {
  id: number,
  title: string,
  groupLabelKey: string,
  rightTitle: string,
  display: number
}

// Old DataItems
/*export type DataItems = {
    id: number,
    start: number,
    end: number
}*/

export type DataItems = {
  id: number,
  group: string,
  title: string,
  start_time: number,
  end_time: number,
  state: number,
  display: number
}

export let Groups:Array<DataGroups> = //export let Groups:ReadonlyArray<DataGroups>
[
    {
      id: 0,
      title: 'Pierre',
      groupLabelKey: "Carles",
      rightTitle: 'DEV',
      display: 1,
    },
    {
      id: 1,
      title: 'Jackes',
      groupLabelKey: "Michelin",
      rightTitle: 'DEV',
      display: 1,
    },
    {
      id: 2,
      title: 'Thomas',
      groupLabelKey: "Clemente",
      rightTitle: 'RH',
      display: 1,
    },
    {
      id: 3,
      title: 'Alice',
      groupLabelKey: "Rudolf",
      rightTitle: 'DEV',
      display: 1,
    },
    {
      id: 4,
      title: 'Paul',
      groupLabelKey: "Vandenghem",
      rightTitle: 'B2B',
      display: 1,
    },
    {
      id: 5,
      title: 'Pierre',
      groupLabelKey: "Louis",
      rightTitle: 'B2B',
      display: 1,
    }
]

/* // LABEL WITH GROUP FUNCTION
export let Groups:Array<DataGroups> = //export let Groups:ReadonlyArray<DataGroups>
[
    {
      id: 1,
      title: 'DEV',
      rightTitle: 'Developpeur Web',
      groupLabelKey: "Developpeur Web",
    },
    {
      id: 2,
      title: 'RH',
      rightTitle: 'Ressources Humaines',
      groupLabelKey: "Developpeur Web",
    },
    {
      id: 3,
      title: 'B2B',
      rightTitle: 'Buisness to Buisness',
      groupLabelKey: "Developpeur Web",
    }
]
*/


/* // OLD CODE
export let Groups = //export let Groups:ReadonlyArray<DataGroups>
[
    {
      id: 1,
      firstname: 'Pierre',
      lastname: 'Charles',
      job: 'Dev'
    },
    {
      id: 2,
      firstname: 'Thomas',
      lastname: 'Clemente',
      job: 'Dev'
    },
    {
      id: 3,
      firstname: 'Paul',
      lastname: 'Vandenghem',
      job: 'RH'
    },
]*/

export let Items = //export let Items:ReadonlyArray<DataItems>
[
    {
        id: 0,
        group: 0,
        title: '8h30 - 12h / 13h - 16h30',
        start_time: Number(moment().startOf('day').add(-2, 'days')),
        end_time: Number(moment().startOf('day').add(5, 'days')),
        state: 0,
        display: 1
    },
    {
        id: 1,
        group: 1,
        title: '8h45 - 12h / 13h - 16h45',
        start_time: Number(moment().startOf('day').add(-3, 'days')),
        end_time: Number(moment().startOf('day').add(7, 'days')),
        state: 0,
        display: 1
    },
    {
        id: 2,
        group: 2,
        title: '9h - 12h / 13h - 17h',
        start_time: Number(moment().startOf('day').add(-4, 'days')),
        end_time:  Number(moment().startOf('day').add(9, 'days')),
        state: 0,
        display: 1
    },
    {
        id: 3,
        group: 3,
        title: '8h - 12h / 13h - 16h',
        start_time: Number(moment().startOf('day').add(0, 'days')),
        end_time: Number(moment().startOf('day').add(13, 'days')),
        state: 1,
        display: 1
    },
    {
        id: 4,
        group: 4,
        title: '8h - 12h / 13h - 16h',
        start_time: Number(moment().startOf('day').add(1, 'days')),
        end_time: Number(moment().startOf('day').add(16, 'days')),
        state: 0,
        display: 1
  },
  {
    id: 5,
    group: 5,
    title: '8h10 - 12h / 13h - 16h10',
    start_time: Number(moment().startOf('day').add(-1, 'days')),
    end_time: Number(moment().startOf('day').add(16, 'days')),
    state: 0,
    display: 1
}
]


/* // Item function of name
export let Items = //export let Items:ReadonlyArray<DataItems>
[
    {
        id: 1,
        group: 1,
        title: 'Pierre',
        start_time: moment().startOf('day'),
        end_time: moment().add(9, 'days')
    },
    {
        id: 2,
        group: 1,
        title: 'Thomas',
        start_time: moment().startOf('day').add(3, 'days'),
        end_time: moment().add(19, 'days')
    },
    {
        id: 3,
        group: 2,
        title: 'Charlie',
        start_time: moment().startOf('day').add(4, 'days'),
        end_time: moment().add(19, 'days')
    },
    {
        id: 4,
        group: 3,
        title: 'Paul',
        start_time: moment().startOf('day').add(7, 'days'),
        end_time: moment().add(9, 'days')
    }
]
*/

/*export let Items = //export let Items:ReadonlyArray<DataItems>
[
    {
        id: 1,
        start: 1457902922261,
        end: 1457902922261 + 86400000
    },
    {
        id: 2,
        start: 1457902922045,
        end: 1457902922045 + 86400000,
    },
    {
        id: 3,
        start: 1457902950078,
        end: 1457902950078 + 86400000,
    }
] 
*/
export default {Groups, Items}