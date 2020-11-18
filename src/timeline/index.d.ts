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

export interface timelineRenderDaysDefaultInterface {
    getItemProps: any,
    item: itemInterface,
    itemContext: itemContextInterface,
}

export interface timelineRenderDaysInterface {
    getItemProps: any,
    item: any,
    itemContext: any,
    reasonState: string,
}
  
export interface timelineRenderFonctionInterface {
    group: fonctionInterface
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

export interface getCorrectTimeInterface {
    prevWeek: visibleTimeInterface
    nextWeek: visibleTimeInterface
    prevMonth: visibleTimeInterface
    nextMonth: visibleTimeInterface
}