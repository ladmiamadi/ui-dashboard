export interface TimelineFilterData {
    visibleTime: visibleTime,
    reason: string,
    searchName: string,
    displayEmptyField: boolean,
    timelineUsers: TimelineDataUsers,
    timelineFonctions: GroupDisplay[],
    isConverting: boolean,
  }

export interface TimelineGroup {
    id: number,
    title: string,
    groupLabelKey: string,
    rightTitle: string,
    convention: number,
}

export interface TimelineItem {
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

export interface TimelineVisibleTime {
    start: number,
    end: number,
}

export interface GroupDisplay {
    id: number,
    groupname: string,
    total: number,
    display: boolean,
}

export interface TimelineDataUsers {
    groups: TimelineGroup[],
    items: TimelineItem[],
}

export interface ItemRendererObject {
    item: TimelineItem,
    itemContext: ItemContextProperties,
    getItemProps: (style: any, itemProps: any) => any,
}
  
export interface GroupRenderObject {
    group: TimelineGroup
}

export interface timelineOptionsPropsInterface {
    timeline: TimelineFilterData,
    updateTimelineReason: (reason: string) => void,
    updateTimelineSearchName: (searchName: string) => void,
    updateTimelineFonctions: (timelineFonctions: GroupDisplay[]) => void,
    updateTimelineEmptyField: (displayEmptyField: boolean) => void,
}

export interface ItemContextProperties {
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