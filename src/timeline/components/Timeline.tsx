import React from 'react';
import moment from 'moment';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from 'react-calendar-timeline';
import { RootState, RootDispatch } from '../../app/state/store';
import { connect } from 'react-redux';
import { User } from '../../app';
import { daysRenderDisplayBackground, 
  daysRenderChangeStateBackground, 
  daysRenderChangeStateColor, renderTimelineUpdateDisplayWithFilters } from '../helpers/renderTimelineUser';
import { listOfFonctionsInterface, displayDataTimelineInterface, 
  timelineRenderDays, timelineRenderFonction } from '../index';
import 'react-calendar-timeline/lib/Timeline.css';
import './styles/Timeline.css';

interface Props {
  updateTimelineVisibleTimeStart: (visibleTimeStart: number) => void,
  updateTimelineVisibleTimeEnd: (visibleTimeEnd: number) => void,
  updateTimelineReason: (reason: string) => void,
  updateTimelineSearchName: (searchName: string) => void,
  updateTimelineUsers: (timelineUsers: displayDataTimelineInterface) => void,
  updateTimelineFonctions: (timelineFonctions: listOfFonctionsInterface[]) => void,
  timelineUsers: displayDataTimelineInterface,
  timelineFonctions: listOfFonctionsInterface[],
  visibleTimeStart: number,
  visibleTimeEnd: number,
  reason: string,
  searchName: string,
  users: User[],
}

export class TimelineCustom extends React.Component<Props> {
  daysRender = ({ item, getItemProps, itemContext }:timelineRenderDays) => {
    if (itemContext.selected)
      item.reason = this.props.reason;
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

  fonctionRender = ({ group }:timelineRenderFonction) => {
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
      </div>
    );
  }

  onPrevClick = () => {
    this.props.updateTimelineVisibleTimeStart(
      moment(this.props.visibleTimeStart).startOf('week').add(-1, 'week').add(1, 'days').valueOf());
    this.props.updateTimelineVisibleTimeEnd(
      moment(this.props.visibleTimeEnd).startOf('week').add(-1, 'week').add(1, 'days').valueOf());
  };

  onPrevClickMonth = () => {
    this.props.updateTimelineVisibleTimeStart(
      moment(this.props.visibleTimeStart).startOf('week').add(-1, 'month').startOf('week').add(1, 'days').valueOf());
    this.props.updateTimelineVisibleTimeEnd(
      moment(this.props.visibleTimeEnd).startOf('week').add(-1, 'month').startOf('week').add(1, 'days').valueOf());
  };

  onNextClick = () => {
    this.props.updateTimelineVisibleTimeStart(
      moment(this.props.visibleTimeStart).startOf('week').add(1, 'week').add(1, 'days').valueOf());
    this.props.updateTimelineVisibleTimeEnd(
      moment(this.props.visibleTimeEnd).startOf('week').add(1, 'week').add(1, 'days').valueOf());
  };

  onNextClickMonth = () => {
    this.props.updateTimelineVisibleTimeStart(
      moment(this.props.visibleTimeStart).startOf('week').add(1, 'month').startOf('week').add(1, 'days').valueOf());
    this.props.updateTimelineVisibleTimeEnd(
      moment(this.props.visibleTimeEnd).startOf('week').add(1, 'month').startOf('week').add(1, 'days').valueOf());
  };

  render() {
    return (
      <div>
        <button onClick={this.onPrevClickMonth}>{'<<<'}</button>
        <button onClick={this.onPrevClick}>{'<<'}</button>
        <button onClick={this.onNextClick}>{'>>'}</button>
        <button onClick={this.onNextClickMonth}>{'>>>'}</button>
        <Timeline
          groups={renderTimelineUpdateDisplayWithFilters(
            this.props.searchName, this.props.timelineFonctions, this.props.timelineUsers)}
          items={this.props.timelineUsers.Days}
          stackItems={true}
          canMove={false}
          itemHeightRatio={0.55}
          lineHeight={55}
          visibleTimeStart={this.props.visibleTimeStart}
          visibleTimeEnd={this.props.visibleTimeEnd}
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
  visibleTimeStart: state.timeline.visibleTimeStart,
  visibleTimeEnd: state.timeline.visibleTimeEnd,
  reason: state.timeline.reason,
  searchName: state.timeline.searchName,
  users: state.users.users,
  timelineUsers: state.timeline.timelineUsers,
  timelineFonctions: state.timeline.timelineFonctions,
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

export default connect(mapState, mapDispatch)(TimelineCustom);