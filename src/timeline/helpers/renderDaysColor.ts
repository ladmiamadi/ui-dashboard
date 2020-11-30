import {
  daysRenderChangeStateBackground,
  daysRenderChangeStateColor,
  daysRenderDisplayBackground,
} from './renderTimelineUserState';
import { ItemRendererObject } from '../index';

export const renderDaysStyle =  (getItem: ItemRendererObject, newReason: string) => {
  getItem.item.reason = getItem.itemContext.selected ? newReason : getItem.item.reason;

  let background = getItem.itemContext.selected ?
    daysRenderChangeStateBackground(getItem.item) :
    daysRenderDisplayBackground(getItem.item);
  let color = daysRenderChangeStateColor(getItem.item);
  const borderColor = getItem.itemContext.selected ? 'orange' : 'rgba(0, 0, 0, 0.5)';

  if (getItem.item.group === -1) {
    color = 'black';
    background = 'red';
    getItem.item.state = 0;
  }

  return { color, background, borderColor };
};