import React from 'react';
import moment from 'moment';
import { visibleTimeInterface } from '../index';

interface Props {
    updateTimelineVisibleTime: (visibleTime: visibleTimeInterface) => void,
    visibleTime: visibleTimeInterface,
}

export class TimelineNavigation extends React.Component<Props> {
  onPrevClick = () => {
    let newDisplayTime: visibleTimeInterface = {
      start: moment(this.props.visibleTime.start).startOf('week').add(-1, 'week').add(1, 'days').valueOf(),
      end: moment(this.props.visibleTime.end).startOf('week').add(-1, 'week').add(1, 'days').valueOf(),
    };
    this.props.updateTimelineVisibleTime(newDisplayTime);
  };

  onPrevClickMonth = () => {
    let newDisplayTime: visibleTimeInterface = {
      start: moment(this.props.visibleTime.start)
        .startOf('week').add(-1, 'month').startOf('week').add(1, 'days').valueOf(),
      end: moment(this.props.visibleTime.end)
        .startOf('week').add(-1, 'month').startOf('week').add(1, 'days').valueOf(),
    };
    this.props.updateTimelineVisibleTime(newDisplayTime);
  };

  onNextClick = () => {
    let newDisplayTime: visibleTimeInterface = {
      start: moment(this.props.visibleTime.start).startOf('week').add(1, 'week').add(1, 'days').valueOf(),
      end: moment(this.props.visibleTime.end).startOf('week').add(1, 'week').add(1, 'days').valueOf(),
    };
    this.props.updateTimelineVisibleTime(newDisplayTime);
  };

  onNextClickMonth = () => {
    let newDisplayTime: visibleTimeInterface = {
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

export default TimelineNavigation;