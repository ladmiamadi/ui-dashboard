import React from 'react';
import { timelineRenderDaysInterface } from '../index';
import { daysRenderDisplayBackground, 
  daysRenderChangeStateBackground, 
  daysRenderChangeStateColor } from '../helpers/renderTimelineUser';

export const TimelineRenderDays = ({ item, getItemProps, itemContext, reasonState }: timelineRenderDaysInterface) => {
  if (itemContext.selected) {
    item.reason = reasonState;
  }
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

export default TimelineRenderDays;