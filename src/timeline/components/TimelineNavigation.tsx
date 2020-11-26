import React from 'react';
import moment from 'moment';
import { TimelineVisibleTime } from '../index';
import { RootState, RootDispatch } from '../../app/state/store';
import { connect } from 'react-redux';

interface Props {
    updateTimelineVisibleTime: (visibleTime: TimelineVisibleTime) => void,
    visibleTime: TimelineVisibleTime,
}

export class TimelineNavigation extends React.Component<Props> {
  onPrevClick = () => {
    let newDisplayTime: TimelineVisibleTime = {
      start: moment(this.props.visibleTime.start).startOf('week').add(-1, 'week').add(1, 'days').valueOf(),
      end: moment(this.props.visibleTime.end).startOf('week').add(-1, 'week').add(1, 'days').valueOf(),
    };
    this.props.updateTimelineVisibleTime(newDisplayTime);
  };

  onPrevClickMonth = () => {
    let newDisplayTime: TimelineVisibleTime = {
      start: moment(this.props.visibleTime.start)
        .startOf('week').add(-1, 'month').startOf('week').add(1, 'days').valueOf(),
      end: moment(this.props.visibleTime.end)
        .startOf('week').add(-1, 'month').startOf('week').add(1, 'days').valueOf(),
    };
    this.props.updateTimelineVisibleTime(newDisplayTime);
  };

  onNextClick = () => {
    let newDisplayTime: TimelineVisibleTime = {
      start: moment(this.props.visibleTime.start).startOf('week').add(1, 'week').add(1, 'days').valueOf(),
      end: moment(this.props.visibleTime.end).startOf('week').add(1, 'week').add(1, 'days').valueOf(),
    };
    this.props.updateTimelineVisibleTime(newDisplayTime);
  };

  onNextClickMonth = () => {
    let newDisplayTime: TimelineVisibleTime = {
      start: moment(this.props.visibleTime.start)
        .startOf('week').add(1, 'month').startOf('week').add(1, 'days').valueOf(),
      end: moment(this.props.visibleTime.end)
        .startOf('week').add(1, 'month').startOf('week').add(1, 'days').valueOf(),
    };
    this.props.updateTimelineVisibleTime(newDisplayTime);
  };

  render() {
    return (
      <div>
        <button onClick={this.onPrevClickMonth}>{'<<<'}</button>
        <button onClick={this.onPrevClick}>{'<<'}</button>
        <button onClick={this.onNextClick}>{'>>'}</button>
        <button onClick={this.onNextClickMonth}>{'>>>'}</button>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  visibleTime: state.timeline.visibleTime,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateTimelineVisibleTime: dispatch.timeline.updateTimelineVisibleTime,
});

export default connect(mapState, mapDispatch)(TimelineNavigation);