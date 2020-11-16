import { fonctionInterface, listOfFonctionsInterface, displayDataTimelineInterface, visibleTimeInterface } from '../index'

export let renderTimelineAddErrorWhenNoResults = (copyDisplayData:fonctionInterface[])=> {
  let noResultFonctions =     
  {
    id: -1,
    title: 'NO RESULT',
    groupLabelKey: "NO RESULT",
    rightTitle: 'ERROR',
    display: 1,
    convention: 0,
  }
  if (copyDisplayData.length === 0)
    copyDisplayData.push(noResultFonctions);
  else {
    copyDisplayData.map((dpdata:fonctionInterface, index:number) => {
      if (dpdata.rightTitle === 'ERROR') {
       copyDisplayData.splice(index, 1);
      }
      return 0;
    });
  }
}

export let checkTimelineUserDataWithFilter = (toChangeOnName:string, checkEmptyField:boolean, visibleTime:visibleTimeInterface, 
  stateDisplay:displayDataTimelineInterface, statelistOfFonctions:listOfFonctionsInterface[]) => {
    let newTimelineDisplay:fonctionInterface[] = []

    statelistOfFonctions.map((tb: listOfFonctionsInterface) => {
      tb.total = 0;

      return 0;
    });
    stateDisplay.Fonctions.map((displayData: fonctionInterface) => {
      statelistOfFonctions.map((fonctionData: listOfFonctionsInterface) => {
        if (fonctionData.display === 1 && fonctionData.groupname === displayData.rightTitle && isEmptyFonctionOfVisibleTimeline(checkEmptyField, stateDisplay, displayData, visibleTime))
          if (displayData.title.toLowerCase().includes(toChangeOnName.toLowerCase()) || 
          displayData.groupLabelKey.toLowerCase().includes(toChangeOnName.toLowerCase())) {
            fonctionData.total += 1
            newTimelineDisplay.push(displayData)
          }
          return 0;
        });
        return 0;
      });
    return newTimelineDisplay;
  }

let isEmptyFonctionOfVisibleTimeline = (displayEmptyField:boolean, stateDisplayRender:displayDataTimelineInterface, 
  currentFonction:fonctionInterface, visibleTime:visibleTimeInterface) => {

  if (displayEmptyField)
    return true;

  for (let i in stateDisplayRender.Days) {
    if (stateDisplayRender.Days[i].group === currentFonction.id) {
      if ((stateDisplayRender.Days[i].end_time >= visibleTime.start && stateDisplayRender.Days[i].end_time <= visibleTime.start) || (
        stateDisplayRender.Days[i].start_time >= visibleTime.end && stateDisplayRender.Days[i].start_time <= visibleTime.end))
        return true;
    }
  }
  return false;
}