import { TimelineGroup, TimelineFilterData } from '../index'
import { renderTimelineAddErrorWhenNoResults, checkTimelineUserDataWithFilter } from '../helpers/checkTimelineUserData';
import { sortTimelineUsersByFonction } from '../helpers/databaseUserDataToTimelineData';

export const renderTimelineUpdateDisplayWithFilters = (timelineFilters: TimelineFilterData) => {
  let newRenderData: TimelineGroup[] = []

  newRenderData = checkTimelineUserDataWithFilter(timelineFilters);

  renderTimelineAddErrorWhenNoResults(newRenderData, timelineFilters);
  sortTimelineUsersByFonction(newRenderData);

  return newRenderData;
}