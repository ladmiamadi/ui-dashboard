import React from 'react';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from 'react-calendar-timeline';
import { connect } from 'react-redux';
import { RootState } from '../../app/state/store';
import {
  ItemRendererObject,
  GroupRenderObject,
  TimelineFilterData,
} from '../index';
import TimelineNavigation from './TimelineNavigation';
import TimelineRenderFonction from './TimelineRenderFonction';
import TimelineRenderDays from './TimelineRenderDays';
import { TIMELINE_PARAMETERS } from '../constants/timeline-parameters';
import { renderTimelineUpdateDisplayWithFilters } from '../helpers/renderTimelineUserData';
import 'react-calendar-timeline/lib/Timeline.css';
import './styles/Timeline.css';

interface Props {
  timeline: TimelineFilterData,
}

export class TimelineCustom extends React.Component<Props> {
  render() {
    const { timelineUsers, visibleTime } = this.props.timeline;

    return (
      <div>
        <TimelineNavigation />
        <Timeline
          {...TIMELINE_PARAMETERS}
          groups={renderTimelineUpdateDisplayWithFilters(this.props.timeline)}
          items={timelineUsers.items}
          visibleTimeStart={visibleTime.start}
          visibleTimeEnd={visibleTime.end}
          itemRenderer={(timelineRenderDays: ItemRendererObject) =>
            <TimelineRenderDays {...timelineRenderDays} />}
          groupRenderer={(timelineRenderFonction: GroupRenderObject) =>
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
});

export default connect(mapState)(TimelineCustom);