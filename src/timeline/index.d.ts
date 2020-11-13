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

export interface timelineRenderDays {
    getItemProps: any,
    item: any,
    itemContext: any,
}
  
export interface timelineRenderFonction {
    group: fonctionInterface
}