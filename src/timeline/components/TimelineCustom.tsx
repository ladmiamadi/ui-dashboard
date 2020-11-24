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
import TimelineRenderFonction from './TimelineRenderFonction';
import TimelineRenderDays from './TimelineRenderDays';
import { renderTimelineUpdateDisplayWithFilters } from '../helpers/renderTimelineUserData';
import { 
  listOfFonctionsInterface, 
  displayDataTimelineInterface, 
  timelineRenderDaysInterface, 
  timelineRenderFonctionInterface, 
  visibleTimeInterface, 
  timelineFilters, 
} from './../index';
import 'react-calendar-timeline/lib/Timeline.css';
import './styles/Timeline.css';

interface Props {
  updateTimelineReason: (reason: string) => void,
  updateTimelineSearchName: (searchName: string) => void,
  updateTimelineUsers: (timelineUsers: displayDataTimelineInterface) => void,
  updateTimelineFonctions: (timelineFonctions: listOfFonctionsInterface[]) => void,
  updateTimelineVisibleTime: (visibleTime: visibleTimeInterface) => void,
  timeline: timelineFilters,
  users: User[],
}

export class TimelineCustom extends React.Component<Props> {
  render() {
    const { 
      visibleTime, 
      timelineUsers,
    } = this.props.timeline;

    return (
      <div>
        <TimelineNavigation
          updateTimelineVisibleTime={(newtime: visibleTimeInterface) =>
          {this.props.updateTimelineVisibleTime(newtime);}} 
          visibleTime={visibleTime}/>
        <Timeline
          groups={renderTimelineUpdateDisplayWithFilters(this.props.timeline)}
          items={timelineUsers.Days}
          stackItems={true}
          canMove={false}
          itemHeightRatio={0.55}
          lineHeight={55}
          visibleTimeStart={visibleTime.start}
          visibleTimeEnd={visibleTime.end}
          sidebarWidth={125}
          itemRenderer={(timelineRenderDays : timelineRenderDaysInterface) => 
            <TimelineRenderDays {...timelineRenderDays} />}
          groupRenderer={(timelineRenderFonction: timelineRenderFonctionInterface) =>
            <TimelineRenderFonction {...timelineRenderFonction} />
          }
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
  timeline: state.timeline,
  users: state.users.users,
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