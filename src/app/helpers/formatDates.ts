export class FormatDates {
  public static formatDate(data: any) {

    const typesDates = [
      'createdDate',
      'updatedDate',
      'startDate',
      'endDate',
      'date',
      'birthDate',
    ];

    typesDates.map(typeDate => data[typeDate] && (data[typeDate] = new Date(data[typeDate])));

  }

  public static updateDateFromList(dataCollection: [any]) {
    dataCollection.forEach(data => {
      this.formatDate(data);
    });
  }
}
