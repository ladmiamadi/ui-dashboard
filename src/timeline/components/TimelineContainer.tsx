import React from 'react';
import { RootDispatch, RootState } from '../../app/state/store';
import { Loader } from '../../app/components/utils/Loader';
import { User } from '../../app';
import { connect } from 'react-redux';
import TimelineCustom from './Timeline';
import TimelineTitle from './TimelineTitle';
import TimelineFilters from './TimelineFilters';
import { listOfFonctionsInterface, displayDataTimelineInterface } from '../index';
import { convertDBDataToTimelineData } from '../helpers/getUserDataFromDB';
import { renderTimelineDisplaySeperateDays } from '../helpers/convertTimelineUserData';
import { renderTimelineAddErrorWhenNoResults } from '../helpers/checkTimelineUserData';
import { renderTimelineUpdateDisplayWithFilters } from '../helpers/renderTimelineUser';

interface Props {
  updateTimelineVisibleTimeStart: (visibleTimeStart: number) => void,
  updateTimelineVisibleTimeEnd: (visibleTimeEnd: number) => void,
  updateTimelineReason: (reason: string) => void,
  updateTimelineSearchName: (searchName: string) => void,
  updateTimelineUsers: (timelineUsers: displayDataTimelineInterface) => void,
  updateTimelineFonctions: (timelineFonctions: listOfFonctionsInterface[]) => void,
  timelineUsers: displayDataTimelineInterface,
  timelineFonctions: listOfFonctionsInterface[],
  users: User[],
  isFetching: boolean,
  visibleTimeStart: number,
  visibleTimeEnd: number,
  reason: string,
  searchName: string,
  fetchTalents: () => void,
}

let hasBeenFetched = false;

export class TimelineContainer extends React.Component<Props> {
  componentDidMount = async () => {
    await this.props.fetchTalents();
    this.convertRawDBDataToTimelineData();
  }

  convertRawDBDataToTimelineData = () => {
    let listOfFonctions = [
      {
        id: -1,
        groupname: 'ERROR',
        total: 0,
        display: 1,
      },
    ];
    let newdata = convertDBDataToTimelineData(this.props.users);
    listOfFonctions.shift();
    let newDisplayData = renderTimelineDisplaySeperateDays(newdata, listOfFonctions);
    renderTimelineAddErrorWhenNoResults(newDisplayData.Fonctions);
    this.props.updateTimelineUsers(newDisplayData);
    this.props.updateTimelineFonctions(listOfFonctions);
  }
 
   toggleCheckBox = (onetable:number) => {
     let listOfFonction = [...this.props.timelineFonctions];
     if (listOfFonction[onetable].display === 0)
       listOfFonction[onetable].display = 1;
     else
       listOfFonction[onetable].display = 0;
     this.props.updateTimelineFonctions(listOfFonction);
     renderTimelineUpdateDisplayWithFilters(
       this.props.searchName, this.props.timelineFonctions, this.props.timelineUsers);
   }

   render() {
     if (this.props.isFetching) {
       hasBeenFetched = true;
       return <Loader />;
     }
     if (!hasBeenFetched) {
       return <Loader />;
     }
     return (
       <div>
         <TimelineTitle />
         <TimelineFilters 
           listOfFonctions={this.props.timelineFonctions}
           onChangeCheckBox={this.toggleCheckBox} 
           onChangeReason={(newreason:string) => {this.props.updateTimelineReason(newreason);}}
           onChangeName={(nametochange:string) => {
             renderTimelineUpdateDisplayWithFilters(
               nametochange, this.props.timelineFonctions, this.props.timelineUsers);
             this.props.updateTimelineSearchName(nametochange);}} />
         <TimelineCustom />
       </div>);
   }
}

const mapState = (state: RootState) => ({
  visibleTimeStart: state.timeline.visibleTimeStart,
  visibleTimeEnd: state.timeline.visibleTimeEnd,
  reason: state.timeline.reason,
  searchName: state.timeline.searchName,
  timelineUsers: state.timeline.timelineUsers,
  timelineFonctions: state.timeline.timelineFonctions,
  users: state.users.users,
  isFetching: state.users.isFetching,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateTimelineVisibleTimeStart: dispatch.timeline.updateTimelineVisibleTimeStart,
  updateTimelineVisibleTimeEnd: dispatch.timeline.updateTimelineVisibleTimeEnd,
  updateTimelineReason: dispatch.timeline.updateTimelineReason,
  updateTimelineSearchName: dispatch.timeline.updateTimelineSearchName,
  updateTimelineUsers: dispatch.timeline.updateTimelineUsers,
  updateTimelineFonctions: dispatch.timeline.updateTimelineFonctions,
  fetchTalents: dispatch.users.fetchTalents,
});

export default connect(mapState, mapDispatch)(TimelineContainer);