import React from 'react'
import moment from "moment"
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from 'react-calendar-timeline' //type:            yarn add react-calendar-timeline && yarn add @types/react-calendar-timeline                to fix module not found
import Data from "../common/Data"
import 'react-calendar-timeline/lib/Timeline.css'
import '../styles/Timeline.css'
import TimelineTitle from './TimelineTitle'
import TimelineFilters from './TimelineFilters'

interface Props {
    Data: string | number,
    moment: number
}

interface itemRenderer {
  getItemProps: any,
  item: any,
  itemContext: any,
}

interface groupRenderer {
  group: any
}

interface State {
    visibleTimeStart: number,
    visibleTimeEnd: number,
    renderitems: any,
    rendergroups: any,
    listOfGroups: any,
    displayData: any,
    filterBackupDisplayData: any,
    reason: any
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

/*
  Groups : People + Fonction
  Items : Days in timeline
*/
export class TimelineCustom extends React.Component<Props,State> {//React.Component<Props,State,Key>

  constructor(props:Props) {
    super(props);

    const visibleTimeStart = moment()
      .startOf("week").add(1, 'days')
      .valueOf();

    const visibleTimeEnd = moment()
      .startOf("week").add(1, 'days')
      .add(1, "week")
      .valueOf();

    // This is automatically edited for each new group added from displayData
    const listOfGroups = [
      {
      id: 0,
      groupname: "DEV",
      total: 0,
      display: 1
      }
    ]

    const displayData = {
      Groups: [...Data.Groups],
      Items: [...Data.Items]
    }

    const reason = "Non Justifiée"

    const filterBackupDisplayData = [    
      {
      id: 0,
      title: 'EXAMPLE',
      groupLabelKey: "EXAMPLE",
      rightTitle: 'EXAMPLE',
      display: 2,
    },]

    const renderitems = this.itemRenderer
    const rendergroups = this.groupRenderer

    this.state = {
      visibleTimeStart,
      visibleTimeEnd,
      renderitems,
      rendergroups,
      listOfGroups,
      displayData,
      filterBackupDisplayData,
      reason
    };
  }

  addFonctionNameToFilters = (tosearch:string) => {
    let listOfFonction = this.state.listOfGroups;
    let copyOfOneItemFonction = {...listOfFonction[0]};

    for (let i in listOfFonction) {
      if (listOfFonction[i].groupname === tosearch) {
        listOfFonction[i].total += 1;
        return tosearch;
      }
    }
    copyOfOneItemFonction.id = listOfFonction.length-1;
    copyOfOneItemFonction.groupname = tosearch;
    copyOfOneItemFonction.total = 1;
    copyOfOneItemFonction.display = 1;
    listOfFonction.push(copyOfOneItemFonction);
    return tosearch;
  }

  /* Sort the data by fonction
  */
  sortAndListOfFonctions = () => {
    let copyDisplayData = {...this.state.displayData};

    for (let i in copyDisplayData.Groups)
      copyDisplayData.Groups[i].rightTitle = this.addFonctionNameToFilters(copyDisplayData.Groups[i].rightTitle);
    this.sortDataArray(copyDisplayData.Groups);
    this.setState({displayData: copyDisplayData});
  }

  sortDataArray = (tosort:any) => {
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

  /* convertTimelineToMultipleDays
    -------------------------------------
    Convert a timezone to be split in multiple selected days
    EXAMPLE : Thomas work from 10 october to 17 october
      the program will convert this timeline in 7 seperate days (2 in the weekend will have different styling), and all other workdays will be able to be selected
  */
  convertTimelineToMultipleDays = () => {
    this.sortAndListOfFonctions()
  
    let copyDisplayData = {...this.state.displayData}
    let DisplayDataItems = copyDisplayData.Items;
    let copyAndEditLastDisplayItem = {...DisplayDataItems[0]};
    let endDateOfItem;
    let newDateOfLastItem;
    let newArrayLenghtOfItem = 0;

    for (let i in Data.Items) {
      if (Data.Items[i].group === -1)
        continue;
      newArrayLenghtOfItem = Number(i)+1;
      endDateOfItem = Data.Items[i].end_time;
      copyAndEditLastDisplayItem = {...DisplayDataItems[i]};
      newDateOfLastItem = copyAndEditLastDisplayItem.start_time;

      while (newDateOfLastItem <= Number(moment(endDateOfItem).startOf('day').add(1, 'days'))) {
        copyAndEditLastDisplayItem = {...DisplayDataItems[newArrayLenghtOfItem-1]};
        copyAndEditLastDisplayItem.start_time = Number(moment(newDateOfLastItem).startOf('day'));
        newDateOfLastItem = Number(moment(newDateOfLastItem).startOf('day').add(1, 'days'));
        copyAndEditLastDisplayItem.end_time = newDateOfLastItem;
        copyAndEditLastDisplayItem.id = DisplayDataItems.length+1;
        if (moment(copyAndEditLastDisplayItem.start_time).startOf('day').format('dddd') === "Saturday" || moment(copyAndEditLastDisplayItem.start_time).startOf('day').format('dddd') === "Sunday")
          copyAndEditLastDisplayItem.state = 3;
        else
          copyAndEditLastDisplayItem.state = Data.Items[i].state;
          newArrayLenghtOfItem = DisplayDataItems.push(copyAndEditLastDisplayItem);
      }
      delete DisplayDataItems[Number(i)]; // Works but may result in crash if we manipulate this later without check
      //rsltData = rsltData.splice(Number(i), 1) //This doesn't work unless we execute the loop for another time maybe (not very optimised)
    }
    this.setState({
      displayData: copyDisplayData
    });
  }

  //Edit the styling of the items
  itemRenderer = ({ item, getItemProps, itemContext }:itemRenderer) => {
    let background = itemContext.selected ? (item.state === 0 ? (item.state = 1, "yellow") : (item.state === 1 ? (item.state = 2, "red") : (item.state === 2 ? (item.state = 3, "gray") : (item.state = 0, "green") ) ) ) : 
    (item.state === 0 ? "green" : (item.state === 1 ? "yellow" : (item.state === 2 ? "red" : "gray" ) ) );
    let color = (item.state === 1 ? "black" : "white" );
    const borderColor = itemContext.selected ? "orange" : "rgba(0, 0, 0, 0.500)";
    if (itemContext.selected)
      item.reason = this.state.reason;
    if (item.group === -1) {
      color = "black";
      background = "red";
      item.state = 0;
    }
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
        }, item.itemProps)}
      >
        {item.state === 0 ? item.title : (item.state === 1 ? "EN ATTENTE" : (item.state === 2 ? ("ABSENT (" + item.reason + ")") : "FERIE"))}
      </div>
    );
  };

  // Edit the styling of the left panel
  groupRenderer = ({ group }:groupRenderer) => {
    //const background = "white"
    const color = "black"
    const borderColor = "black"
    return (
      <div className="custom-group"
        style={{
          textAlign: 'center',
          //background,
          color,
          borderColor
        }}
      >
        <span className="title">[{group.rightTitle}] - {group.title}</span>
        <p className="tip">{group.tip}</p>
      </div>
    )
  }

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

  /*
    Change what group (Fonctions) to display in function of filters
  */
  changeDisplayGroup = (tochange:any, enable:boolean)=> {
    let copyDisplayData = {...this.state.displayData};
    let copyBackupDataFilter = [...this.state.filterBackupDisplayData];
    
    for (let i in copyDisplayData.Groups) {
      if (!copyDisplayData.Groups[i])
        continue;
      if (copyDisplayData.Groups[i].rightTitle === tochange) {
        if (!enable) {
          copyBackupDataFilter.push(copyDisplayData.Groups[i]);
          copyDisplayData.Groups[i].display = 0;
          copyDisplayData.Groups.splice(Number(i), 1);
        }
      }
    }
    // Re-Verification to make sure everything that is matching has been moved and deleted with splice
    for (let i in copyDisplayData.Groups) {
      if (!copyDisplayData.Groups[i])
        continue;
      if (copyDisplayData.Groups[i].rightTitle === tochange) {
        if (!enable) {
          copyBackupDataFilter.push(copyDisplayData.Groups[i]);
          copyDisplayData.Groups[i].display = 0;
          copyDisplayData.Groups.splice(Number(i), 1);
        }
      }
    }
    // -----------------
    if (enable) {
      for (let i in copyBackupDataFilter) {
        if (!copyBackupDataFilter[i])
          continue;
        if (copyBackupDataFilter[i].rightTitle === tochange) {
          console.log(copyBackupDataFilter);
          copyDisplayData.Groups.push(copyBackupDataFilter[i]);
          copyDisplayData.Groups[copyDisplayData.Groups.length-1].display = 1;
          copyBackupDataFilter.splice(Number(i), 1);
        }
      }
      // Re-Verification to make sure everything that is matching has been moved and deleted with splice
      for (let i in copyBackupDataFilter) {
        if (!copyBackupDataFilter[i])
          continue;
        if (copyBackupDataFilter[i].rightTitle === tochange) {
          console.log(copyBackupDataFilter);
          copyDisplayData.Groups.push(copyBackupDataFilter[i]);
          copyDisplayData.Groups[copyDisplayData.Groups.length-1].display = 1;
          copyBackupDataFilter.splice(Number(i), 1);
        }
      }
      // -----------------
    }
    this.changeDisplayGroupWhenNoResults(copyDisplayData)
    this.sortDataArray(copyDisplayData.Groups)
    this.setState(state => ({
      filterBackupDisplayData: copyBackupDataFilter,
      displayData: copyDisplayData,
      visibleTimeStart: Number(state.visibleTimeStart)+1 //Forcing timeline refresh
    }));
  }

  changeDisplayGroupWhenNoResults = (copyDisplayData:any)=> {
    let noResultGroups =     
    {
      id: -1,
      title: 'NO RESULT',
      groupLabelKey: "NO RESULT",
      rightTitle: 'ERROR',
      display: 1,
    }
    if (copyDisplayData.Groups.length === 0) {
      copyDisplayData.Groups.push(noResultGroups);
    }
    else {
      for (let i in copyDisplayData.Groups) {
        if (copyDisplayData.Groups[i].rightTitle === 'ERROR') {
          console.log("dab");
          copyDisplayData.Groups.splice(Number(i), 1);
        }
      }
      for (let i in copyDisplayData.Groups) {
        if (copyDisplayData.Groups[i].rightTitle === 'ERROR') {
          console.log("dab");
          copyDisplayData.Groups.splice(Number(i), 1);
        }
      }
    }
  }

  toggleCheckBox = (onetable:any) => {
      let listOfFonction = this.state.listOfGroups
      if (listOfFonction[onetable].display === 0) {
        listOfFonction[onetable].display = 1;
        this.changeDisplayGroup(listOfFonction[onetable].groupname, true);
      }
      else {
        listOfFonction[onetable].display = 0;
        this.changeDisplayGroup(listOfFonction[onetable].groupname, false);
      }
  }

  reasonToggle = (newreason:any) => {
    this.setState({
      reason: newreason
    });
  }

  //Call all sorting functions for timeline
  componentWillMount() {
    this.convertTimelineToMultipleDays();
  }

  render() {
    const { visibleTimeStart, visibleTimeEnd, displayData, rendergroups, renderitems } = this.state;
    return (
      <div>
        <TimelineTitle />
        <TimelineFilters listOfGroups={this.state.listOfGroups} onChangeCheckBox={this.toggleCheckBox} onChangeReason={this.reasonToggle}/>
        <button onClick={this.onPrevClickMonth}>{"<<<"}</button>
        <button onClick={this.onPrevClick}>{"<<"}</button>
        {/* <button onClick={this.onPrevClickDay}>{"<"}</button>
        <button onClick={this.onNextClickDay}>{">"}</button> */}
        <button onClick={this.onNextClick}>{">>"}</button>
        <button onClick={this.onNextClickMonth}>{">>>"}</button>
        <Timeline
          groups={displayData.Groups}
          items={displayData.Items}
          stackItems={true}
          canMove={false}
          itemHeightRatio={0.55}
          lineHeight={55}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          sidebarWidth={100}
          itemRenderer={renderitems}
          groupRenderer={rendergroups}
          >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }) => {
                return <div {...getRootProps()}>[Fonction] - Nom</div>
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
