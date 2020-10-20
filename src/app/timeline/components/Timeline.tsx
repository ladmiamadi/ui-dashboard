import React from 'react'
import moment from "moment"
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from 'react-calendar-timeline' //type: yarn add react-calendar-timeline && yarn add @types/react-calendar-timeline to fix module not found
import Data from "../common/Data"
import 'react-calendar-timeline/lib/Timeline.css'
import '../styles/Timeline.css'
import TimelineTitle from './TimelineTitle'

interface Props {
    Data: string | number,
    moment: number
}

interface itemRenderer {
  getItemProps: any,
  item: any,
  itemContext: any
}

interface State {
    visibleTimeStart: number,
    visibleTimeEnd: number,
    groupsidlist: any
}

// Interfaces are not working...
/*interface Key {
  groupIdKey: string,
  groupTitleKey: string,
  groupRightTitleKey: string,
  itemIdKey: string,  
  itemTitleKey: string,  
  itemDivTitleKey: string,
  itemGroupKey: string, 
  itemTimeStartKey: string,
  itemTimeEndKey: string
}*/

/*let keys:Key = {
  groupIdKey: "id",
  groupTitleKey: "lastname",
  groupRightTitleKey: "lastname",
  itemIdKey: "id",  
  itemTitleKey: "job",
  itemDivTitleKey: "job",
  itemGroupKey: "id", 
  itemTimeStartKey: "start",
  itemTimeEndKey: "end"
};*/

export class TimelineCustom extends React.Component<Props,State> {//React.Component<Props,State,Key>

  constructor(props:Props) {
    super(props);

    const { Groups, Items } = Data;
    const visibleTimeStart = moment()
      .startOf("week").add(1, 'days')
      .valueOf();

    const visibleTimeEnd = moment()
      .startOf("week").add(1, 'days')
      .add(1, "week")
      .valueOf();

    /* IMPORTANT
    Groups ids :
      1: DEV -=- 2: RH -=- 3: Commercial
    */
    const groupsidlist = {
      0: "DEV 1",
      1: "DEV 2",
      2: "DEV 3",
      3: "RH",
      4: "Commercial",
    }

    /*const GroupToNodes = Groups.map(groups => {
      const isRoot = () => {
        if (groups.title == "DEV" || groups.title == "RH" || groups.title == "B2B")
          return true
        else
          return false
      }
      const parent = isRoot() ? null : groups.id;

      return Object.assign({}, groups, {
        root: isRoot,
        parent: parent
      });
    })*/

    this.state = {
      visibleTimeStart,
      visibleTimeEnd,
      groupsidlist,
    };
  }

  // result = items //// sorted = group
  sort_data_array = (toreturn:any) => {
    let sorting = [...Data.Groups]
    let unsorteditems = [...Data.Items]
    let sortedname = []
    let sorted = []
    let result = []
    let i
    let j
    for (i in Data.Groups) {
      sortedname.push(sorting[i].rightTitle)
    }
    sortedname.sort()
    for (i in Data.Groups) {
      for (j in Data.Groups) {
        if (sorting[j].rightTitle == sortedname[i]) {
          sorted.push(sorting[j])
          break
        }
      }
    }
    for (i in Data.Groups) {
      for (j in Data.Groups) {
        if (this.state.groupsidlist[j] == sorted[i].rightTitle) {
          result.push(unsorteditems[j])
          break
        }
      }
    }
    console.log(result)
    console.log("vs")
    console.log(sorted)
    return [...result]
  }

  /* convert_timeline_to_multiple_days
    -------------------------------------
    Convert a timezone to be split in multiple selected days
    EXAMPLE : Thomas work from 10 october to 17 october with 1 day break on monday
      the program will convert this timeline in 5 seperate days (2 less because weekend), and all other workdays will be able to be selected, so in this case, weekday for Monday
  */
  convert_timeline_to_multiple_days = () => {
    let i;
    let rsltData = this.sort_data_array(1);
    let newCP = {...rsltData[0]};
    let datelimit;
    let newDates;
    let arraybckp = 0;

    console.log(rsltData)
    for (i in Data.Items) {
      arraybckp = Number(i)+1;
      datelimit = Data.Items[i].end_time;
      newCP = {...rsltData[i]};
      newDates = newCP.start_time;
  
      while (newDates <= Number(moment(datelimit).startOf('day').add(1, 'days'))) {
        if (moment(newDates).startOf('day').format('dddd') === "Saturday" || moment(newDates).startOf('day').format('dddd') === "Sunday") {
          newDates = Number(moment(newDates).startOf('day').add(1, 'days'));
          continue;
        }

        newCP = {...rsltData[arraybckp-1]};
        newCP.start_time = Number(moment(newDates).startOf('day'));
        newDates = Number(moment(newDates).startOf('day').add(1, 'days'));
        newCP.end_time = newDates;
        newCP.id = rsltData.length+1;
        arraybckp = rsltData.push(newCP);
      }
      //console.log(moment(newDates).format('MMMM Do YYYY, h:mm:ss a')); // DEBUG to check if date correspond to timeline (NOTE : Substract one day to be correct)
      delete rsltData[Number(i)]; // Works best but may result in crash if we manipulate this later without check
      //rsltData.splice(Number(i), 1) //Other way of doing it
    }
    return rsltData;
  }

  //Edit the styling of the items
  itemRenderer = ({ item, getItemProps, itemContext }:itemRenderer) => {
    const background = itemContext.selected ? (item.state == 0 ? (item.state = 1, "yellow") : (item.state == 1 ? (item.state = 2, "red") : (item.state = 0, "green") ) ) : 
    (item.state == 0 ? "green" : (item.state == 1 ? "yellow" : "red" ) )
    const color = (item.state == 1 ? "black" : "white" )
    const borderColor = itemContext.selected ? "orange" : "rgba(0, 0, 0, 0.500)"
    return (
      <div
        {...getItemProps({
          style: {
            background,
            color,
            borderColor,
            borderLeftWidth: itemContext.selected ? 5 : 1,
            borderRightWidth: itemContext.selected ? 5 : 1
          }
        })}
      >
        {item.state == 0 ? itemContext.title : (item.state == 1 ? "EN ATTENTE" : "ABSENT")}
      </div>
    );
  };

  onPrevClick = () => {
    this.setState(state => ({
      visibleTimeStart: Number(moment(state.visibleTimeStart).startOf("week").add(-1, 'week').add(1, 'days')),
      visibleTimeEnd: Number(moment(state.visibleTimeEnd).startOf("week").add(-1, 'week').add(1, 'days'))
    }));
  };

  onPrevClickMonth = () => {
    this.setState(state => ({
      visibleTimeStart: Number(moment(state.visibleTimeStart).startOf("week").add(-1, 'month').startOf("week").add(1, 'days')),
      visibleTimeEnd: Number(moment(state.visibleTimeEnd).startOf("week").add(-1, 'month').startOf("week").add(1, 'days'))
    }));
  };

  onNextClick = () => {
    this.setState(state => ({
      visibleTimeStart: Number(moment(state.visibleTimeStart).startOf("week").add(1, 'week').add(1, 'days')),
      visibleTimeEnd: Number(moment(state.visibleTimeEnd).startOf("week").add(1, 'week').add(1, 'days'))
    }));
  };

  onNextClickMonth = () => {
    this.setState(state => ({
      visibleTimeStart: Number(moment(state.visibleTimeStart).startOf("week").add(1, 'month').startOf("week").add(1, 'days')),
      visibleTimeEnd: Number(moment(state.visibleTimeEnd).startOf("week").add(1, 'month').startOf("week").add(1, 'days'))
    }));
  };

  render() {
    const { visibleTimeStart, visibleTimeEnd } = this.state;
    const newarrayitems = this.convert_timeline_to_multiple_days()
    return (
      <div>
        <TimelineTitle />
        <button onClick={this.onPrevClickMonth}>{"<<<"}</button>
        <button onClick={this.onPrevClick}>{"<<"}</button>
        {/* <button onClick={this.onPrevClickDay}>{"<"}</button>
        <button onClick={this.onNextClickDay}>{">"}</button> */}
        <button onClick={this.onNextClick}>{">>"}</button>
        <button onClick={this.onNextClickMonth}>{">>>"}</button>
        <Timeline
          //keys={newkeys}
          groups={Data.Groups}
          items={newarrayitems}
          stackItems
          canMove={false}
          itemHeightRatio={0.55}
          lineHeight={55}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          rightSidebarWidth={75}
          sidebarWidth={100}
          itemRenderer={this.itemRenderer}
          >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }) => {
                return <div {...getRootProps()}>Nom</div>
              }}
            </SidebarHeader>
            <SidebarHeader variant="right">
              {({ getRootProps }) => {
                return <div {...getRootProps()}>Fonction</div>
              }}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
      </div>
    );
  }
}

export default TimelineCustom;
