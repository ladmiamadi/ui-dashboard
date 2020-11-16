import React from 'react';
import { RootDispatch, RootState } from '../../app/state/store';
import { Loader } from '../../app/components/utils/Loader';
import { User } from '../../app';
import { connect } from 'react-redux';
import TimelineCustom from './Timeline';
import TimelineTitle from './TimelineTitle';
import TimelineFilters from './TimelineFilters';
import { listOfFonctionsInterface, visibleTimeInterface, displayDataTimelineInterface } from '../index';
import { convertDBDataToTimelineData } from '../helpers/getUserDataFromDB';
import { renderTimelineDisplaySeperateDays } from '../helpers/convertTimelineUserData';
import { renderTimelineAddErrorWhenNoResults } from '../helpers/checkTimelineUserData';
import { renderTimelineUpdateDisplayWithFilters } from '../helpers/renderTimelineUser';

interface Props {
  updateTimelineReason: (reason: string) => void,
  updateTimelineSearchName: (searchName: string) => void,
  updateTimelineUsers: (timelineUsers: displayDataTimelineInterface) => void,
  updateTimelineVisibleTime: (visibleTime: visibleTimeInterface) => void,
  updateTimelineFonctions: (timelineFonctions: listOfFonctionsInterface[]) => void,
  updateTimelineEmptyField: (displayEmptyField: boolean) => void,
  timelineUsers: displayDataTimelineInterface,
  timelineFonctions: listOfFonctionsInterface[],
  users: User[],
  isFetching: boolean,
  visibleTime: visibleTimeInterface,
  reason: string,
  searchName: string,
  displayEmptyField: boolean,
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
       this.props.searchName, 
       this.props.displayEmptyField, 
       this.props.visibleTime, 
       this.props.timelineFonctions, 
       this.props.timelineUsers);
   }

   toggleEmptyFields = () => {
     if (this.props.displayEmptyField) {
       this.props.updateTimelineEmptyField(false);
     } else {
       this.props.updateTimelineEmptyField(true);
     }
   }

   render() {
     if (this.props.isFetching) {
       hasBeenFetched = true;

       return <Loader />;
     }
     if (!hasBeenFetched)
       return <Loader />;
     return (
       <div>
         <TimelineTitle />
         <TimelineFilters 
           listOfFonctions={this.props.timelineFonctions}
           onChangeCheckBox={this.toggleCheckBox} 
           onChangeEmptyField={this.toggleEmptyFields}
           onChangeReason={(newreason:string) => {this.props.updateTimelineReason(newreason);}}
           onChangeName={(nametochange:string) => {
             renderTimelineUpdateDisplayWithFilters(
               nametochange, 
               this.props.displayEmptyField, 
               this.props.visibleTime, 
               this.props.timelineFonctions, 
               this.props.timelineUsers);
             this.props.updateTimelineSearchName(nametochange);}} />
         <TimelineCustom />
       </div>);
   }
}

const mapState = (state: RootState) => ({
  visibleTime: state.timeline.visibleTime,
  reason: state.timeline.reason,
  searchName: state.timeline.searchName,
  displayEmptyField: state.timeline.displayEmptyField,
  timelineUsers: state.timeline.timelineUsers,
  timelineFonctions: state.timeline.timelineFonctions,
  users: state.users.users,
  isFetching: state.users.isFetching,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateTimelineVisibleTime: dispatch.timeline.updateTimelineVisibleTime,
  updateTimelineReason: dispatch.timeline.updateTimelineReason,
  updateTimelineSearchName: dispatch.timeline.updateTimelineSearchName,
  updateTimelineEmptyField: dispatch.timeline.updateTimelineEmptyField,
  updateTimelineUsers: dispatch.timeline.updateTimelineUsers,
  updateTimelineFonctions: dispatch.timeline.updateTimelineFonctions,
  fetchTalents: dispatch.users.fetchTalents,
});

export default connect(mapState, mapDispatch)(TimelineContainer);