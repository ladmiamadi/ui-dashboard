import React from 'react';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from 'react-calendar-timeline';
import TimelineNavigation from './TimelineNavigation';
import { RootState } from '../../app/state/store';
import { connect } from 'react-redux';
import { timelineConstParameters } from '../constants/timelineParameters';
import TimelineRenderFonction from './TimelineRenderFonction';
import TimelineRenderDays from './TimelineRenderDays';
import { renderTimelineUpdateDisplayWithFilters } from '../helpers/renderTimelineUserData';
import { 
  ItemRendererObject, 
  GroupRenderObject, 
  TimelineFilterData, 
} from '../index';
import 'react-calendar-timeline/lib/Timeline.css';
import './styles/Timeline.css';

interface Props {
  timeline: TimelineFilterData,
}

export class TimelineCustom extends React.Component<Props> {
  render() {

    return (
      <div>
        <TimelineNavigation />
        <Timeline
          {...timelineConstParameters}
          groups={renderTimelineUpdateDisplayWithFilters(this.props.timeline)}
          items={this.props.timeline.timelineUsers.items}
          visibleTimeStart={this.props.timeline.visibleTime.start}
          visibleTimeEnd={this.props.timeline.visibleTime.end}
          itemRenderer={(timelineRenderDays : ItemRendererObject) => 
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