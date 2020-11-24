import { fonctionInterface, timelineFiltersInterface } from '../index'
import { renderTimelineAddErrorWhenNoResults, checkTimelineUserDataWithFilter } from '../helpers/checkTimelineUserData';
import { sortTimelineUsersByFonction } from '../helpers/databaseUserDataToTimelineData';

export const renderTimelineUpdateDisplayWithFilters = (timelineFilters: timelineFiltersInterface) => {
  let newRenderData: fonctionInterface[] = []

  newRenderData = checkTimelineUserDataWithFilter(timelineFilters);

  renderTimelineAddErrorWhenNoResults(newRenderData, timelineFilters);
  sortTimelineUsersByFonction(newRenderData);

  return newRenderData;
}