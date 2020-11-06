export let changeDisplayInternshipWhenNoResults = (copyDisplayData:any)=> {
  let noResultFonctions =     
  {
    id: -1,
    title: 'NO RESULT',
    groupLabelKey: "NO RESULT",
    rightTitle: 'ERROR',
    display: 1,
  }
  if (copyDisplayData.length === 0) {
    copyDisplayData.push(noResultFonctions);
  }
  else {
    for (let i in copyDisplayData) {
      if (copyDisplayData[i].rightTitle === 'ERROR') {
       copyDisplayData.splice(Number(i), 1);
      }
    }
  }
}

export let changeDisplayInternshipByFonction = (copyDisplaybackup:any, toChangeOnName:any, statedisplayDataBackupFonctions:any, statelistOfFonctions:any) => {
    let stateDisplayDataBackup = statedisplayDataBackupFonctions
    let listOfFonctions = statelistOfFonctions
    
    for (let i in listOfFonctions) {
      listOfFonctions[i].total = 0
    }
    for (let i in stateDisplayDataBackup) {
      for (let j in listOfFonctions) {
        if (listOfFonctions[j].display === 1 && listOfFonctions[j].groupname === stateDisplayDataBackup[i].rightTitle)
          if (stateDisplayDataBackup[i].title.toLowerCase().includes(toChangeOnName.toLowerCase()) || stateDisplayDataBackup[i].groupLabelKey.toLowerCase().includes(toChangeOnName.toLowerCase())) {
            listOfFonctions[j].total += 1
            copyDisplaybackup.push(stateDisplayDataBackup[i])
          }
      }
    }
    return copyDisplaybackup
  }