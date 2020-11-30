import React from 'react';
import { connect } from 'react-redux';
import { TimelineVisibleTime } from '../index';
import { RootState, RootDispatch } from '../../app/state/store';
import { onPrevClickMonth, onPrevClick, onNextClick, onNextClickMonth } from '../helpers/updateNavigation';

interface Props {
    visibleTime: TimelineVisibleTime,
    updateTimelineVisibleTime: (visibleTime: TimelineVisibleTime) => void,
}

export class TimelineNavigation extends React.Component<Props> {
  render() {
    const { visibleTime, updateTimelineVisibleTime } = this.props;

    return (
      <div>
        <button onClick={() => onPrevClickMonth(visibleTime, updateTimelineVisibleTime)}>{'<<<'}</button>
        <button onClick={() => onPrevClick(visibleTime, updateTimelineVisibleTime)}>{'<<'}</button>
        <button onClick={() => onNextClick(visibleTime, updateTimelineVisibleTime)}>{'>>'}</button>
        <button onClick={() => onNextClickMonth(visibleTime, updateTimelineVisibleTime)}>{'>>>'}</button>
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