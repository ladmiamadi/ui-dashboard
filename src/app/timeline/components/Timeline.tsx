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

// interface avec maj au debut
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
    renderDays: any,
    renderFonctions: any,
    listOfFonctions: any,
    displayData: any,
    displayDataBackup: any,
    filterBackupDisplayData: any,
    reason: any,
    searchName: any
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
  Groups : People + Fonction (Dev)
  Items : Days in timeline
*/

// Remplacer group par intern

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
    const listOfFonctions = [
      {
      id: 0,
      groupname: "DEV",
      total: 0,
      display: 1
      }
    ]

    const displayDataBackup = {
      Fonctions: [...Data.Groups],
      Days: [...Data.Items]
    }

    const displayData = {
      Fonctions: [...Data.Groups],
      Days: [...Data.Items]
    }

    const reason = "Non Justifiée"

    const searchName = ""

    const filterBackupDisplayData = [    
      {
      id: 0,
      title: 'EXAMPLE',
      groupLabelKey: "EXAMPLE",
      rightTitle: 'EXAMPLE',
      display: 2,
    },]

    const renderDays = this.itemRenderer
    const renderFonctions = this.groupRenderer

    this.state = {
      visibleTimeStart,
      visibleTimeEnd,
      renderDays,
      renderFonctions,
      listOfFonctions,
      displayData,
      displayDataBackup,
      filterBackupDisplayData,
      reason,
      searchName
    };
  }

  addFonctionNameToFilters = (tosearch:string) => {
    let listOfFonction = this.state.listOfFonctions;
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

    for (let i in copyDisplayData.Fonctions)
      copyDisplayData.Fonctions[i].rightTitle = this.addFonctionNameToFilters(copyDisplayData.Fonctions[i].rightTitle);
    this.sortDataArray(copyDisplayData.Fonctions);
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
    let DisplayDataDays = copyDisplayData.Days;
    let copyAndEditLastDisplayItem = {...DisplayDataDays[0]};
    let endDateOfItem;
    let newDateOfLastItem;
    let newArrayLenghtOfItem = 0;

    for (let i in Data.Items) {
      if (Data.Items[i].group === -1)
        continue;
      newArrayLenghtOfItem = Number(i)+1;
      endDateOfItem = Data.Items[i].end_time;
      copyAndEditLastDisplayItem = {...DisplayDataDays[i]};
      newDateOfLastItem = copyAndEditLastDisplayItem.start_time;

      while (newDateOfLastItem <= Number(moment(endDateOfItem).startOf('day').add(1, 'days'))) {
        copyAndEditLastDisplayItem = {...DisplayDataDays[newArrayLenghtOfItem-1]};
        copyAndEditLastDisplayItem.start_time = Number(moment(newDateOfLastItem).startOf('day'));
        newDateOfLastItem = Number(moment(newDateOfLastItem).startOf('day').add(1, 'days'));
        copyAndEditLastDisplayItem.end_time = newDateOfLastItem;
        copyAndEditLastDisplayItem.id = DisplayDataDays.length+1;
        if (moment(copyAndEditLastDisplayItem.start_time).startOf('day').format('dddd') === "Saturday" || moment(copyAndEditLastDisplayItem.start_time).startOf('day').format('dddd') === "Sunday")
          copyAndEditLastDisplayItem.state = 3;
        else
          copyAndEditLastDisplayItem.state = Data.Items[i].state;
          newArrayLenghtOfItem = DisplayDataDays.push(copyAndEditLastDisplayItem);
      }
      delete DisplayDataDays[Number(i)]; // Works but may result in crash if we manipulate this later without check
      //rsltData = rsltData.splice(Number(i), 1) //This doesn't work unless we execute the loop for another time maybe (not very optimised)
    }
    this.setState({
      displayData: copyDisplayData,
      displayDataBackup: copyDisplayData
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
    const fontSize = "11px"
    return (
      <div className="custom-group"
        style={{
          textAlign: 'left',
          fontSize,
          //background,
          color,
          borderColor
        }}
      >
        <span className="title">[{group.rightTitle}] - {group.title} {group.groupLabelKey[0]}.</span>
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
  changeDisplayInternship = (toChangeOnFonction:any, toChangeOnName:any, enable:boolean)=> {
    let copyDisplaybackup = new Array()

    copyDisplaybackup = this.changeDisplayInternshipByFonction(copyDisplaybackup, toChangeOnFonction, toChangeOnName, enable)

    this.changeDisplayInternshipWhenNoResults(copyDisplaybackup)
    this.sortDataArray(copyDisplaybackup)
    this.setState(state => ({
      displayData: {
        Fonctions: copyDisplaybackup,
        Days: state.displayData.Days
      },
      visibleTimeStart: Number(state.visibleTimeStart)+1 //Forcing timeline refresh
    }));
  }

  changeDisplayInternshipByFonction = (copyDisplaybackup:any, toChangeOnFonction:any, toChangeOnName:any, enable:boolean) => {
    let stateDisplayDataBackup = this.state.displayDataBackup.Fonctions
    let listOfFonctions = this.state.listOfFonctions
    
    for (let i in stateDisplayDataBackup) {
      for (let j in listOfFonctions) {
        if (listOfFonctions[j].display === 1 && listOfFonctions[j].groupname === stateDisplayDataBackup[i].rightTitle)
          if (stateDisplayDataBackup[i].title.toLowerCase().includes(toChangeOnName.toLowerCase()) || stateDisplayDataBackup[i].groupLabelKey.toLowerCase().includes(toChangeOnName.toLowerCase()))
            copyDisplaybackup.push(stateDisplayDataBackup[i])
      }
    }
    return copyDisplaybackup
  }

  changeDisplayInternshipWhenNoResults = (copyDisplayData:any)=> {
    let noResultFonctions =     
    {
      id: -1,
      title: 'NO RESULT',
      groupLabelKey: "NO RESULT",
      rightTitle: 'ERROR',
      display: 1,
    }
    if (copyDisplayData.length === 0) {
      copyDisplayData.push(noResultFonctions);
    }
    else {
      for (let i in copyDisplayData) {
        if (copyDisplayData[i].rightTitle === 'ERROR') {
          copyDisplayData.splice(Number(i), 1);
        }
      }
    }
  }

  toggleCheckBox = (onetable:any) => {
      let listOfFonction = this.state.listOfFonctions
      if (listOfFonction[onetable].display === 0) {
        listOfFonction[onetable].display = 1;
        this.changeDisplayInternship(listOfFonction[onetable].groupname, this.state.searchName, true);
      }
      else {
        listOfFonction[onetable].display = 0;
        this.changeDisplayInternship(listOfFonction[onetable].groupname, this.state.searchName, false);
      }
  }

  filterNameChange = (nametochange:any) => {
    this.changeDisplayInternship(undefined, nametochange, true);
    this.setState({
      searchName: nametochange
    });
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
    const { visibleTimeStart, visibleTimeEnd, displayData, renderFonctions, renderDays } = this.state;
    return (
      <div>
        <TimelineTitle />
        <TimelineFilters listOfFonctions={this.state.listOfFonctions} onChangeCheckBox={this.toggleCheckBox} onChangeReason={this.reasonToggle} onChangeName={this.filterNameChange}/>
        <button onClick={this.onPrevClickMonth}>{"<<<"}</button>
        <button onClick={this.onPrevClick}>{"<<"}</button>
        {/* <button onClick={this.onPrevClickDay}>{"<"}</button>
        <button onClick={this.onNextClickDay}>{">"}</button> */}
        <button onClick={this.onNextClick}>{">>"}</button>
        <button onClick={this.onNextClickMonth}>{">>>"}</button>
        <Timeline
          groups={displayData.Fonctions}
          items={displayData.Days}
          stackItems={true}
          canMove={false}
          itemHeightRatio={0.55}
          lineHeight={55}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          sidebarWidth={100}
          itemRenderer={renderDays}
          groupRenderer={renderFonctions}
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
