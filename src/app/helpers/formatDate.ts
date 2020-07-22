export class FormatDate {
  public static formatDate(data: any) {
    if (data.createdDate)
      data.createdDate = new Date(data.createdDate);
    if (data.updatedDate)
      data.updatedDate = new Date(data.createdDate);
    if (data.startDate)
      data.startDate = new Date(data.startDate);
    if (data.endDate)
      data.endDate = new Date(data.endDate);
    if (data.date)
      data.date = new Date(data.date);
    if (data.birthDate)
      data.birthDate = new Date(data.birthDate);
  }

  public static updateDateFromList(dataCollection: [any]) {
    dataCollection.forEach(data => {
      this.formatDate(data);
    });
  }
}
