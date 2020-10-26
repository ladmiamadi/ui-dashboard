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
    groupslistall: any,
    SortedData: any
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

    const visibleTimeStart = moment()
      .startOf("week").add(1, 'days')
      .valueOf();

    const visibleTimeEnd = moment()
      .startOf("week").add(1, 'days')
      .add(1, "week")
      .valueOf();

    // This is automatically edited for each new group added from SortedData
    const groupslistall = [
      {
      id: 0,
      groupname: "DEV",
      total: 0,
      display: 1
      }
    ]

    const SortedData = {
      Groups: [...Data.Groups],
      Items: [...Data.Items]
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

    const renderitems = this.itemRenderer
    const rendergroups = this.groupRenderer

    this.state = {
      visibleTimeStart,
      visibleTimeEnd,
      renderitems,
      rendergroups,
      groupslistall,
      SortedData,
    };
  }

  AddNumberAfterGroupname = (tosearch:string) => {
    let backuparray = this.state.groupslistall;
    let backuparraycpy = {...backuparray[0]};
    let i;
    for (i in backuparray) {
      if (backuparray[i].groupname === tosearch) {
        backuparray[i].total += 1;
        return tosearch;
      }
    }
    backuparraycpy.id = backuparray.length-1;
    backuparraycpy.groupname = tosearch;
    backuparraycpy.total = 1;
    backuparraycpy.display = 1;
    backuparray.push(backuparraycpy);
    return tosearch;
  }

  // OLD SORTING of Groups and items
  // OBSELETE
  // result = items //// sorted = group
  /*SortDataArray = () => {
    this.AddNumberAfterGroupname("Dev")
    this.AddNumberAfterGroupname("PD")
    let sorting = this.state.SortedData.Groups
    let unsorteditems = this.state.SortedData.Items
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
        if (sorting[j].rightTitle === sortedname[i]) {
          sorted.push(sorting[j])
          break
        }
      }
    }
    for (i in Data.Items) {
      for (j in Data.Items) {
        if (this.state.groupsidlist[j] === sorted[i].rightTitle) {
          result.push(unsorteditems[j])
          break
        }
      }
    }
    //this.setState({SortedData: {Groups: [...sorted]}}) // good but doesnt work
    //this.SortedData()
    this.state.SortedData.Groups = sorted
    this.state.SortedData.Items = result
  }*/

  /* Sort the data by fonction
  */
  SortDataArray = () => {
    console.log("=============================");
    
    //let init_object = Object.assign({}, this.state.SortedData);
    let init_object = {...this.state.SortedData}
    //let sortedgroups_state = this.state.SortedData.Groups
    let sortedgroups_state = init_object.Groups
    //let init_items_state = this.state.SortedData.Items
    let i
  
    for (i in sortedgroups_state) {
      sortedgroups_state[i].rightTitle = this.AddNumberAfterGroupname(sortedgroups_state[i].rightTitle)
    }
    sortedgroups_state.sort((a:any, b:any) => {
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
    this.setState({SortedData: init_object})
  }

  /* ConvertTimelineToMultipleDays
    -------------------------------------
    Convert a timezone to be split in multiple selected days
    EXAMPLE : Thomas work from 10 october to 17 october with 1 day break on monday
      the program will convert this timeline in 5 seperate days (2 less because weekend), and all other workdays will be able to be selected, so in this case, weekday for Monday
  */
  ConvertTimelineToMultipleDays = () => {
    this.SortDataArray()
  
    let i;
    //let init_object = Object.assign({}, this.state.SortedData);
    let init_object = {...this.state.SortedData}
    //let init_object = {...this.state.SortedData}
    //let rsltData = this.state.SortedData.Items;
    let rsltData = init_object.Items;
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
        newCP = {...rsltData[arraybckp-1]};
        newCP.start_time = Number(moment(newDates).startOf('day'));
        newDates = Number(moment(newDates).startOf('day').add(1, 'days'));
        newCP.end_time = newDates;
        newCP.id = rsltData.length+1;
        if (moment(newCP.start_time).startOf('day').format('dddd') === "Saturday" || moment(newCP.start_time).startOf('day').format('dddd') === "Sunday")
          newCP.state = 3
        else
          newCP.state = Data.Items[i].state
        arraybckp = rsltData.push(newCP);
      }
      
      //rsltData.splice(Number(i), 1)
      delete rsltData[Number(i)]; // Works but may result in crash if we manipulate this later without check
      //rsltData.splice(Number(i), 1) //Other way of doing it
    }
    //SETSTATE
    this.setState({SortedData: init_object})
  }

  //Edit the styling of the items
  itemRenderer = ({ item, getItemProps, itemContext }:itemRenderer) => {
    const background = itemContext.selected ? (item.state === 0 ? (item.state = 1, "yellow") : (item.state === 1 ? (item.state = 2, "red") : (item.state === 2 ? (item.state = 3, "gray") : (item.state = 0, "green") ) ) ) : 
    (item.state === 0 ? "green" : (item.state === 1 ? "yellow" : ((item.state === 2 ? "red" : "gray" )) ) );
    const color = (item.state === 1 ? "black" : "white" );
    const borderColor = itemContext.selected ? "orange" : "rgba(0, 0, 0, 0.500)";
    const display = (item.display === 0 ? "none" : "inline")
    const raison = "?"
    console.log("itemRenderer");
    return (
      <div
        {...getItemProps({
          style: {
            background,
            color,
            borderColor,
            display,
            borderLeftWidth: itemContext.selected ? 5 : 1,
            borderRightWidth: itemContext.selected ? 5 : 1
          }
        }, item.itemProps)}
      >
        {item.state === 0 ? item.title : (item.state === 1 ? "EN ATTENTE" : (item.state === 2 ? ("ABSENT " + "(" + raison + ")") : "FERIE"))}
      </div>
    );//item.title
  };

  // Edit the styling of the left panel
  groupRenderer = ({ group }:groupRenderer) => {
    //const background = "white"
    const color = "black"
    const borderColor = "black"
    const display = (group.display === 0 ? "none" : "inline")
    //console.log(group)
    console.log("groupRenderer");
    return (
      <div className="custom-group"
        style={{
          textAlign: 'center',
          //background,
          color,
          borderColor,
          display,
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

  ChangeDisplayGroup = (tochange:any, enable:any) => {
    let i
    let j
    //let SortedDataGroups = Object.assign({}, this.state.SortedData);
    let SortedDataGroups = {...this.state.SortedData}
    let groupidchange = []
    //const SortedDataGroups = [...this.state.SortedData]
    console.log("POUTINE");
    console.log(SortedDataGroups.Groups);
    
    for (i in SortedDataGroups.Groups) {
      //console.log(SortedDataGroups.Groups[i].rightTitle + " VS " + tochange);
      
      if (SortedDataGroups.Groups[i].rightTitle === tochange) {
        if (enable === 1) {
          SortedDataGroups.Groups[i].display = 1
        }
        else {
          //console.log(SortedDataGroups.Groups[i]);
          
          SortedDataGroups.Groups[i].display = 0
          groupidchange.push(SortedDataGroups.Groups[i].id)
          SortedDataGroups.Groups.splice(i, 1)
          //delete SortedDataGroups.Groups[Number(i)];
        }
      }
    }
    for (i in SortedDataGroups.Items) {
      console.log(SortedDataGroups.Items[i].group + " VS " + groupidchange);
      for (j in groupidchange) {
      if (SortedDataGroups.Items[i].group === groupidchange[j]) {
        if (enable === 0) {
          SortedDataGroups.Items[i].state = 2
          SortedDataGroups.Items[i].title = "YES"
          SortedDataGroups.Items.splice(i, 1)
        }
      }
    }
  }
    console.log("POOTIS");
    //this.setState({SortedData : SortedDataGroups})
    this.setState(state => ({
      visibleTimeStart: Number(moment(state.visibleTimeStart)),
      SortedData: SortedDataGroups
    }));
    console.log(SortedDataGroups)
  }

  ToggleCheckBox = (onetable:any) => {
    //this.ConvertTimelineToMultipleDays();
    /*let getData = this.state.groupslistall
    if (getData[onetable].display === 0)
      getData[onetable].display = 1
    else
      getData[onetable].display = 0*/
      /*this.setState(prevState => ({
        groupslistall: prevState.groupslistall.map(
          (obj: { display: number }) => (obj.display === 0 ? Object.assign(obj, { display: 0}) : Object.assign(obj, { display: 1}))
        )
      }))*/
      let groupslistall = this.state.groupslistall
      if (groupslistall[onetable].display === 0) {
        groupslistall[onetable].display = 1
        this.ChangeDisplayGroup(groupslistall[onetable].groupname, 1)
      }
      else {
        groupslistall[onetable].display = 0
        this.ChangeDisplayGroup(groupslistall[onetable].groupname, 0)
      }
      //this.setState({groupslistall})
  }

  componentWillMount() {
    this.ConvertTimelineToMultipleDays(); //Call all sorting functions for timeline
  }

  render() {
    /*if (this.state.SortedData.Items.length === this.state.SortedData.Groups.length)
      this.ConvertTimelineToMultipleDays(); //Call all sorting functions for timeline*/
    const { visibleTimeStart, visibleTimeEnd, SortedData, rendergroups, renderitems } = this.state;
    /*const RenderTimelineFilters = this.state.groupslistall.map((tb: any, index: any) => {
      return <TimelineFilters key={index} grouplist={tb}/>
    })*/
    console.log("UPDATED RENDER");
    
    return (
      <div>
        <TimelineTitle />
        {/*RenderTimelineFilters*/}
        <TimelineFilters groupslistall={this.state.groupslistall} onChange={this.ToggleCheckBox} />
        <button onClick={this.onPrevClickMonth}>{"<<<"}</button>
        <button onClick={this.onPrevClick}>{"<<"}</button>
        {/* <button onClick={this.onPrevClickDay}>{"<"}</button>
        <button onClick={this.onNextClickDay}>{">"}</button> */}
        <button onClick={this.onNextClick}>{">>"}</button>
        <button onClick={this.onNextClickMonth}>{">>>"}</button>
        <Timeline
          groups={SortedData.Groups}
          items={SortedData.Items}
          stackItems={true}
          canMove={false}
          itemHeightRatio={0.55}
          lineHeight={55}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          sidebarWidth={100}
          itemRenderer={renderitems}
          //itemRenderer={this.itemRenderer}
          groupRenderer={rendergroups}
          //groupRenderer={this.groupRenderer}
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
