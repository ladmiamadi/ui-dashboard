let daysRenderDisplayAbsenceReason = (days:any) => {
    switch (days.reason) {
      case "Maladie":
        return "orange";
      case "Personnel":
        return "gray";
      case "Non Justifiée":
        return "red";
      case "Formation":
        return "blue";
      case "Retard":
        return "brown";
      case "Déplacement":
        return "purple";
      default:
        return "red";
    }
}

export let daysRenderDisplayBackground = (days:any) => {
    switch (days.state) {
      case 0:
        return "green";
      case 1:
        return daysRenderDisplayAbsenceReason(days);
      default:
        return "gray";
    }
}

export let daysRenderChangeStateBackground = (days:any) => {
    switch (days.state) {
      case 0:
        days.state = 1;
        return daysRenderDisplayAbsenceReason(days);
      default:
        days.state = 0;
        return "green";
    }
}

export let daysRenderChangeStateColor = (days:any) => {
    if (days.reason === "Maladie" && days.state === 1)
      return "black"
    else
      return "white"
}