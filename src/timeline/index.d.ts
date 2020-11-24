import { User } from '../../app';
import { toggleCheckBox, updateSearchTherms, toggleEmptyFields } from '../helpers/updateTimelineOptions';

export interface timelineFilters {
    visibleTime: visibleTimeInterface,
    reason: string,
    searchName: string,
    displayEmptyField: boolean,
    timelineUsers: displayDataTimelineInterface,
    timelineFonctions: listOfFonctionsInterface[],
  }

export interface fonctionInterface {
    id: number,
    title: string,
    groupLabelKey: string,
    rightTitle: string,
    convention: number,
}

export interface daysInterface {
    id: number,
    group: number,
    title: string,
    start_time: number,
    end_time: number,
    state: number,
    reason: string,
    workdays: string[],
    itemProps: any,
}

export interface visibleTimeInterface {
    start: number,
    end: number,
}

export interface daysRenderInterface {
    id: number,
    group: number,
    title: string,
    start_time: number,
    end_time: number,
    state: number,
    reason: string,
    workdays: string[],
    selected: boolean,
    itemProps: any,
}

export interface listOfFonctionsInterface {
    id: number,
    groupname: string,
    total: number,
    display: number,
}

export interface displayDataTimelineInterface {
    Fonctions: fonctionInterface[],
    Days: daysInterface[],
}

export interface timelineFiltersInterface {
    searchName: string,
    displayEmptyField: boolean,
    visibleTime: visibleTimeInterface,
    timelineFonctions: listOfFonctionsInterface[],
    timelineUsers: displayDataTimelineInterface,
}

export interface timelineRenderDaysInterface {
    getItemProps: (style: any, itemProps: any) => any,
    item: itemInterface,
    itemContext: itemContextInterface,
}
  
export interface timelineRenderFonctionInterface {
    group: fonctionInterface
}

export interface timelineOptionsPropsInterface {
    updateTimelineReason: (reason: string) => void,
    updateTimelineSearchName: (searchName: string) => void,
    updateTimelineFonctions: (timelineFonctions: listOfFonctionsInterface[]) => void,
    updateTimelineEmptyField: (displayEmptyField: boolean) => void,
    timeline: timelineFilters,
}

export interface timelineFiltersPropsInterface {
    timeline: timelineFilters,
    onChangeCheckBox: (onetable: number) => toggleCheckBox,
    onChangeEmptyField: () => toggleEmptyFields,
    onChangeReason: (newreason: string) => updateTimelineReason,
    onChangeName: (nametochange: string) => updateSearchTherms,
    timelineOptionsProps: timelineOptionsPropsInterface,
}

export interface timelineContainerPropsInterface {
    updateTimelineReason: (reason: string) => void,
    updateTimelineSearchName: (searchName: string) => void,
    updateTimelineUsers: (timelineUsers: displayDataTimelineInterface) => void,
    updateTimelineVisibleTime: (visibleTime: visibleTimeInterface) => void,
    updateTimelineFonctions: (timelineFonctions: listOfFonctionsInterface[]) => void,
    updateTimelineEmptyField: (displayEmptyField: boolean) => void,
    timeline: timelineFilters,
    users: User[],
    isFetching: boolean,
    fetchTalents: () => void,
}

export interface timelineContextInterface {
    timelineWidth: number,
    visibleTimeStart: number,
    visibleTimeEnd: number,
    canvasTimeStart: number,
    canvasTimeEnd: number,
}

export interface itemInterface {
    id: number,
    group: number,
    title: string,
    start_time: number,
    end_time: number,
    state: number,
    reason: string,
    workdays: string[],
    itemProps: any,
}

export interface itemContextInterface {
    dimensions: object,
    useResizeHandle: boolean,
    title: string,
    canMove: boolean,
    canResizeLeft: boolean,
    canResizeRight: boolean,
    selected: boolean,
    dragging: boolean,
    dragStart: object,
    dragTime: number,
    dragGroupDelta: number,
    resizing: boolean,
    resizeEdge: any,
    resizeStart: number,
    resizeTime: number,
    width: boolean,
}