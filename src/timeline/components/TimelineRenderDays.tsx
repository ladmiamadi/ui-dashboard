import React from 'react';
import { timelineRenderDaysInterface } from '../index';
import { daysRenderDisplayBackground, 
  daysRenderChangeStateBackground, 
  daysRenderChangeStateColor } from '../helpers/renderTimelineUserState';
import { RootState } from '../../app/state/store';
import { connect } from 'react-redux';

interface Props extends timelineRenderDaysInterface {
  reason: string,
}

export class TimelineRenderDays extends React.Component<Props> {
  render() {
    if (this.props.itemContext.selected) {
      this.props.item.reason = this.props.reason;
    }
    let background = this.props.itemContext.selected ? 
      daysRenderChangeStateBackground(this.props.item) : 
      daysRenderDisplayBackground(this.props.item);
    let color = daysRenderChangeStateColor(this.props.item);
    const borderColor = this.props.itemContext.selected ? 'orange' : 'rgba(0, 0, 0, 0.500)';
    if (this.props.item.group === -1) {
      color = 'black';
      background = 'red';
      this.props.item.state = 0;
    }

    return (
      <div
        {...this.props.getItemProps({
          style: {
            background,
            color,
            borderColor,
            borderLeftWidth: this.props.itemContext.selected ? 5 : 1,
            borderRightWidth: this.props.itemContext.selected ? 5 : 1,
          },
        }, this.props.item.itemProps)}
      >
        {this.props.item.state === 0 ? this.props.item.title : 
          (this.props.item.state === 1 ? ('ABSENT (' + this.props.item.reason + ')') : 'FERIE')}
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  reason: state.timeline.reason,
});

export default connect(mapState)(TimelineRenderDays);