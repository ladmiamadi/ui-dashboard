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

interface Props {
    Data: string | number,
    moment: number
}

interface State {
    visibleTimeStart: number,
    visibleTimeEnd: number
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
      visibleTimeEnd
    };
  }

  /* convert_timeline_to_multiple_days
    -------------------------------------
    Convert a timezone to be split in multiple selected days
    EXAMPLE : Thomas work from 10 october to 17 october with 1 day break on monday
      the program will convert this timeline in 5 seperate days (2 less because weekend), and all other workdays will be able to be selected, so in this case, weekday for Monday
  */
  convert_timeline_to_multiple_days = () => {
    let i;
    let rsltData = [...Data.Items];
    let newCP = {...rsltData[0]};
    let datelimit;
    let newDates;
    let arraybckp = 0;

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


  onPrevClick = () => {
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
    this.setState(state => ({
      visibleTimeStart: state.visibleTimeStart - zoom,
      visibleTimeEnd: state.visibleTimeEnd - zoom
    }));
  };

  onPrevClickMonth = () => {
    const zoom = (this.state.visibleTimeEnd - this.state.visibleTimeStart)*4;
    this.setState(state => ({
      visibleTimeStart: state.visibleTimeStart - zoom,
      visibleTimeEnd: state.visibleTimeEnd - zoom
    }));
  };

  onNextClick = () => {
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
    this.setState(state => ({
      visibleTimeStart: state.visibleTimeStart + zoom,
      visibleTimeEnd: state.visibleTimeEnd + zoom
    }));
  };

  onNextClickMonth = () => {
    const zoom = (this.state.visibleTimeEnd - this.state.visibleTimeStart)*4;
    this.setState(state => ({
      visibleTimeStart: state.visibleTimeStart + zoom,
      visibleTimeEnd: state.visibleTimeEnd + zoom
    }));
  };

  render() {
    const { visibleTimeStart, visibleTimeEnd } = this.state;
    const newarrayitems = this.convert_timeline_to_multiple_days()
    return (
      <div>
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
          itemHeightRatio={0.75}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          rightSidebarWidth={75}
          >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }) => {
                return <div {...getRootProps()}>Name</div>
              }}
            </SidebarHeader>
            <SidebarHeader variant="right">
              {({ getRootProps }) => {
                return <div {...getRootProps()}>Profession</div>
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
