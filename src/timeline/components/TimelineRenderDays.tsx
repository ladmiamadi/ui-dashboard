import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../app/state/store';
import { ItemRendererObject } from '../index';
import { renderDaysStyle } from '../helpers/renderDaysColor';
import { setTimelineItemContent } from '../helpers/renderTimelineUserData';

interface Props extends ItemRendererObject {
  reason: string,
}

export class TimelineRenderDays extends React.Component<Props> {
  render() {
    let { color, background, borderColor } = renderDaysStyle(this.props, this.props.reason);

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
        {setTimelineItemContent(this.props)}
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  reason: state.timeline.reason,
});

export default connect(mapState)(TimelineRenderDays);