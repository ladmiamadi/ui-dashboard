import { FormatDate } from '../helpers/formatDate';

export class UsersDateFormatter {
  public static transformDateFormat(dataCollection: [any]) {
    dataCollection.forEach(data => {
      FormatDate.formatDate(data);
      if (data.userJob)
        FormatDate.formatDate(data.userJob);
      if (data.userJob && data.userJob.job)
        FormatDate.formatDate(data.userJob.job);
      FormatDate.updateDateFromList(data.userExperiences);
      FormatDate.updateDateFromList(data.userTrainings);
      FormatDate.updateDateFromList(data.userContracts);
      FormatDate.updateDateFromList(data.userAbsences);
      FormatDate.updateDateFromList(data.userInterviews);
      FormatDate.updateDateFromList(data.userProfiles);
    });
  }
}

