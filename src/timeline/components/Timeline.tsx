import React from 'react';
import moment from 'moment';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from 'react-calendar-timeline';//yarn add react-calendar-timeline && yarn add @types/react-calendar-timelined
import { RootState, RootDispatch } from '../../app/state/store';
import { connect } from 'react-redux';

import Data from '../common/Data';
import { User } from '../../app';

import 'react-calendar-timeline/lib/Timeline.css';
import '../styles/Timeline.css';

import TimelineTitle from './TimelineTitle';
import TimelineFilters from './TimelineFilters';
//import TimelineInfo from './TimelineInfo';

import { convertDataToTimeline, sortDataArray } from '../common/Data';
import { changeDisplayInternshipWhenNoResults, 
  changeDisplayInternshipByFonction } from '../common/ChangeDisplayInternship';
import { daysRenderDisplayBackground, 
  daysRenderChangeStateBackground, 
  daysRenderChangeStateColor } from '../common/RenderDisplay';
import { convertTimelineToMultipleDaysRemote } from '../common/ConvertDataToMultipleDays';

interface Props {
  users: User[],
}

interface daysRender {
  getItemProps: any,
  item: any,
  itemContext: any,
}

interface fonctionRender {
  group: any
}

interface State {
    visibleTimeStart: number,
    visibleTimeEnd: number,
    listOfFonctions: any,
    displayData: any,
    displayDataBackup: any,
    reason: any,
    searchName: any
}

/*
  Groups : People + Fonction (Dev)
  Items : Days in timeline
*/
export class TimelineCustom extends React.Component<Props,State> {

  constructor(props:Props) {
    super(props);

    convertDataToTimeline(this.props.users);

    const visibleTimeStart = moment()
      .startOf('week').add(1, 'days')
      .valueOf();

    const visibleTimeEnd = moment()
      .startOf('week').add(1, 'days')
      .add(1, 'week')
      .valueOf();

    const listOfFonctions = [
      {
        id: -1,
        groupname: 'ERROR',
        total: 0,
        display: 1,
      },
    ];

    const displayDataBackup = {
      Fonctions: [...Data.Groups],
      Days: [...Data.Items],
    };

    const displayData = {
      Fonctions: [...Data.Groups],
      Days: [...Data.Items],
    };

    const reason = 'Maladie';

    const searchName = '';

    this.state = {
      visibleTimeStart,
      visibleTimeEnd,
      listOfFonctions,
      displayData,
      displayDataBackup,
      reason,
      searchName,
    };

    //this.convertTimelineToMultipleDays();
  }

  /* convertTimelineToMultipleDays
    -------------------------------------
    Convert a timezone to be split in multiple selected days
    EXAMPLE : Thomas work from 10 october to 17 october
      the program will convert this timeline in 7 seperate days and the state will be in 
      function of workdays, and all other workdays will be able to be selected
  */
  convertTimelineToMultipleDays = () => {
    this.state.listOfFonctions.shift();
    let copyDisplayData = convertTimelineToMultipleDaysRemote(this.state.displayData, this.state.listOfFonctions);
    changeDisplayInternshipWhenNoResults(copyDisplayData.Fonctions);
    this.setState({
      displayData: copyDisplayData,
      displayDataBackup: copyDisplayData,
    });
  }

  //Edit the styling of the items
  daysRender = ({ item, getItemProps, itemContext }:daysRender) => {
    if (itemContext.selected)
      item.reason = this.state.reason;
    let background = itemContext.selected ? daysRenderChangeStateBackground(item) : daysRenderDisplayBackground(item);
    let color = daysRenderChangeStateColor(item);
    const borderColor = itemContext.selected ? 'orange' : 'rgba(0, 0, 0, 0.500)';
    if (item.group === -1) {
      color = 'black';
      background = 'red';
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
            borderRightWidth: itemContext.selected ? 5 : 1,
          },
        }, item.itemProps)}
      >
        {item.state === 0 ? item.title : (item.state === 1 ? ('ABSENT (' + item.reason + ')') : 'FERIE')}
      </div>
    );
  };

  // Edit the styling of the left panel
  fonctionRender = ({ group }:fonctionRender) => {
    const color = 'black';
    const borderColor = 'black';
    const fontSize = '11px';
    return (
      <div className="custom-group"
        style={{
          textAlign: 'left',
          fontSize,
          color,
          borderColor,
        }}
      >
        <span className="title">[{group.rightTitle}] - {group.title} {group.groupLabelKey[0]}.</span>
        <p className="tip">{group.tip}</p>
      </div>
    );
  }

  onPrevClick = () => {
    this.setState(state => ({
      visibleTimeStart: Number(moment(state.visibleTimeStart).startOf('week').add(-1, 'week').add(1, 'days')),
      visibleTimeEnd: Number(moment(state.visibleTimeEnd).startOf('week').add(-1, 'week').add(1, 'days')),
    }));
  };

  onPrevClickMonth = () => {
    this.setState(state => ({
      visibleTimeStart: Number(moment(state.visibleTimeStart)
        .  startOf('week').add(-1, 'month').startOf('week').add(1, 'days')),
      visibleTimeEnd: Number(moment(state.visibleTimeEnd)
        .  startOf('week').add(-1, 'month').startOf('week').add(1, 'days')),
    }));
  };

  onNextClick = () => {
    this.setState(state => ({
      visibleTimeStart: Number(moment(state.visibleTimeStart).startOf('week').add(1, 'week').add(1, 'days')),
      visibleTimeEnd: Number(moment(state.visibleTimeEnd).  startOf('week').add(1, 'week').add(1, 'days')),
    }));
  };

  onNextClickMonth = () => {
    this.setState(state => ({
      visibleTimeStart: Number(moment(state.visibleTimeStart)
        .  startOf('week').add(1, 'month').startOf('week').add(1, 'days')),
      visibleTimeEnd: Number(moment(state.visibleTimeEnd)
        .startOf('week').add(1, 'month').startOf('week').add(1, 'days')),
    }));
  };

  /*
    Change what group (Fonctions) to display in function of filters
  */
 changeDisplayInternship = (toChangeOnName:any)=> {
   let copyDisplaybackup = new Array();

   copyDisplaybackup = changeDisplayInternshipByFonction(copyDisplaybackup, 
     toChangeOnName, this.state.displayDataBackup.Fonctions, this.state.listOfFonctions);
   changeDisplayInternshipWhenNoResults(copyDisplaybackup);
   sortDataArray(copyDisplaybackup);
   this.setState(state => ({
     displayData: {
       Fonctions: copyDisplaybackup,
       Days: state.displayData.Days,
     },
     visibleTimeStart: Number(state.visibleTimeStart) + 1, //Forcing timeline refresh
   }));
 }

toggleCheckBox = (onetable:any) => {
  let listOfFonction = this.state.listOfFonctions;
  if (listOfFonction[onetable].display === 0) {
    listOfFonction[onetable].display = 1;
    this.changeDisplayInternship(this.state.searchName);
  }
  else {
    listOfFonction[onetable].display = 0;
    this.changeDisplayInternship(this.state.searchName);
  }
}

filterNameChange = (nametochange:any) => {
  this.changeDisplayInternship(nametochange);
  this.setState({
    searchName: nametochange,
  });
}

  reasonToggle = (newreason:any) => {
    this.setState({
      reason: newreason,
    });
  }

  //Call all sorting functions for timeline to sort it to be understable for the timeline, call only at the begining
  // not found yet a replacement of componentWillMount without it breaks everything on the timeline
  componentWillMount() {
    this.convertTimelineToMultipleDays();
  }

  /*componentDidMount() {
    this.convertTimelineToMultipleDays();
  }*/

  render() {
    const { visibleTimeStart, visibleTimeEnd, displayData } = this.state;
    return (
      <div>
        <TimelineTitle />
        <TimelineFilters 
          listOfFonctions={this.state.listOfFonctions} 
          onChangeCheckBox={this.toggleCheckBox} 
          onChangeReason={this.reasonToggle} 
          onChangeName={this.filterNameChange}/>
        {/*<TimelineInfo test="UNDEFINED"/>*/} />}
        <button onClick={this.onPrevClickMonth}>{'<<<'}</button>
        <button onClick={this.onPrevClick}>{'<<'}</button>
        {/* <button onClick={this.onPrevClickDay}>{"<"}</button>
        <button onClick={this.onNextClickDay}>{">"}</button> */}
        <button onClick={this.onNextClick}>{'>>'}</button>
        <button onClick={this.onNextClickMonth}>{'>>>'}</button>
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
          itemRenderer={this.daysRender}
          groupRenderer={this.fonctionRender}
        >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }) => {
                return <div {...getRootProps()}>[Fonction] - Nom</div>;
              }}
            </SidebarHeader>
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  users: state.users.users,
  isFetching: state.users.isFetching,
});

// push data in db
const mapDispatch = (dispatch: RootDispatch) => ({
  fetchTalents: dispatch.users.fetchTalents,
});

export default connect(mapState, mapDispatch)(TimelineCustom);