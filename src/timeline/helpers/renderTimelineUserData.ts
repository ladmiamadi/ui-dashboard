import { TimelineGroup, TimelineFilterData, ItemRendererObject } from '../index';
import { renderTimelineAddErrorWhenNoResults, checkTimelineUserDataWithFilter } from './checkTimelineUserData';
import { sortTimelineUsersByFonction } from './databaseUserDataToTimelineData';
import { TIMELINE_ITEM_CONTENT } from '../constants/timeline-item';

export const renderTimelineUpdateDisplayWithFilters = (timelineFilters: TimelineFilterData) => {
  let newRenderData: TimelineGroup[] = [];

  newRenderData = checkTimelineUserDataWithFilter(timelineFilters);
  renderTimelineAddErrorWhenNoResults(newRenderData, timelineFilters);
  sortTimelineUsersByFonction(newRenderData);

  return newRenderData;
};

export const setTimelineItemContent = (timelineItem: ItemRendererObject) => {
  const itemContent = TIMELINE_ITEM_CONTENT[timelineItem.item.state];

  if (itemContent.itemName) {
    itemContent.itemName = timelineItem.item.title;
  }

  if (itemContent.itemName === TIMELINE_ITEM_CONTENT[1].itemName) {
    itemContent.itemName = timelineItem.item.reason;
  }

  return itemContent.prefix + itemContent.itemName + itemContent.suffix;
};