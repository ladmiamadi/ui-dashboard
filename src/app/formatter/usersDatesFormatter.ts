import { FormatDates } from '../helpers/formatDates';

export class UsersDatesFormatter {
  public static transformDateFormat(dataCollection: [any]) {
    dataCollection.forEach(data => {
      FormatDates.formatDate(data);
      if (data.userJob)
        FormatDates.formatDate(data.userJob);
      if (data.userJob && data.userJob.job)
        FormatDates.formatDate(data.userJob.job);
      FormatDates.updateDateFromList(data.userExperiences);
      FormatDates.updateDateFromList(data.userTrainings);
      FormatDates.updateDateFromList(data.userContracts);
      FormatDates.updateDateFromList(data.userAbsences);
      FormatDates.updateDateFromList(data.userInterviews);
      FormatDates.updateDateFromList(data.userProfiles);
    });
  }
}

