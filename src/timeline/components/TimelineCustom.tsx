import React from 'react';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from 'react-calendar-timeline';
import { TimelineNavigation } from './TimelineNavigation';
import { RootState, RootDispatch } from '../../app/state/store';
import { connect } from 'react-redux';
import { User } from '../../app';
import { TimelineRenderFonction } from './TimelineRenderFonction';
import { TimelineRenderDays } from './TimelineRenderDays';
import { renderTimelineUpdateDisplayWithFilters } from '../helpers/renderTimelineUser';
import { listOfFonctionsInterface, displayDataTimelineInterface, 
  timelineRenderDaysDefaultInterface, timelineRenderFonctionInterface, 
  visibleTimeInterface, timelineFiltersInterface } from './../index';
import 'react-calendar-timeline/lib/Timeline.css';
import './styles/Timeline.css';

interface Props {
  updateTimelineReason: (reason: string) => void,
  updateTimelineSearchName: (searchName: string) => void,
  updateTimelineUsers: (timelineUsers: displayDataTimelineInterface) => void,
  updateTimelineFonctions: (timelineFonctions: listOfFonctionsInterface[]) => void,
  updateTimelineVisibleTime: (visibleTime: visibleTimeInterface) => void,
  timelineUsers: displayDataTimelineInterface,
  timelineFonctions: listOfFonctionsInterface[],
  visibleTime: visibleTimeInterface,
  reason: string,
  searchName: string,
  displayEmptyField: boolean,
  users: User[],
}

export class TimelineCustom extends React.Component<Props> {
  daysRender = ({ item, getItemProps, itemContext }: timelineRenderDaysDefaultInterface) => {
    return <TimelineRenderDays 
      item={item} 
      getItemProps={getItemProps} 
      itemContext={itemContext} 
      reasonState={this.props.reason} />;
  };

  fonctionRender = ({ group }: timelineRenderFonctionInterface) => {
    return <TimelineRenderFonction group={group} />;
  }

  render() {
    const timelineFilters: timelineFiltersInterface = {
      searchName: this.props.searchName,
      displayEmptyField: this.props.displayEmptyField,
      visibleTime: this.props.visibleTime,
      timelineFonctions: this.props.timelineFonctions,
      timelineUsers: this.props.timelineUsers,
    };
    return (
      <div>
        <TimelineNavigation
          updateTimelineVisibleTime={(newtime: visibleTimeInterface) =>
          {this.props.updateTimelineVisibleTime(newtime);}} 
          visibleTime={this.props.visibleTime}/>
        <Timeline
          groups={renderTimelineUpdateDisplayWithFilters(timelineFilters)}
          items={this.props.timelineUsers.Days}
          stackItems={true}
          canMove={false}
          itemHeightRatio={0.55}
          lineHeight={55}
          visibleTimeStart={this.props.visibleTime.start}
          visibleTimeEnd={this.props.visibleTime.end}
          sidebarWidth={125}
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
  visibleTime: state.timeline.visibleTime,
  reason: state.timeline.reason,
  searchName: state.timeline.searchName,
  displayEmptyField: state.timeline.displayEmptyField,
  users: state.users.users,
  timelineUsers: state.timeline.timelineUsers,
  timelineFonctions: state.timeline.timelineFonctions,
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

export default connect(mapState, mapDispatch)(TimelineCustom);