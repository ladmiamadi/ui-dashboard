import { fonctionInterface, listOfFonctionsInterface } from '../index'

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

export let checkTimelineUserDataWithFilter = (copyDisplaybackup:fonctionInterface[], toChangeOnName:string, 
  statedisplayDataBackupFonctions:fonctionInterface[], statelistOfFonctions:listOfFonctionsInterface[]) => {
    let stateDisplayDataBackup = statedisplayDataBackupFonctions
    let listOfFonctions = statelistOfFonctions
    
    listOfFonctions.map((tb: listOfFonctionsInterface) => {
      tb.total = 0;
      return 0;
    });
    stateDisplayDataBackup.map((displayData: fonctionInterface) => {
      listOfFonctions.map((fonctionData: listOfFonctionsInterface) => {
        if (fonctionData.display === 1 && fonctionData.groupname === displayData.rightTitle)
          if (displayData.title.toLowerCase().includes(toChangeOnName.toLowerCase()) || 
          displayData.groupLabelKey.toLowerCase().includes(toChangeOnName.toLowerCase())) {
            fonctionData.total += 1
            copyDisplaybackup.push(displayData)
          }
          return 0;
        });
        return 0;
      });
    return copyDisplaybackup;
  }