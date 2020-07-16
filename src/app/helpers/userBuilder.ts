import { FormatDate } from './formatDate';

export class UserBuilder {
  public static transformDateFormat(data: [any]) {
    console.log(data);
    data.forEach( updatedData => {
      FormatDate.formatDate(updatedData);
      if (updatedData.userJob)
        FormatDate.formatDate(updatedData.userJob);
      if (updatedData.userJob && updatedData.userJob.job)
        FormatDate.formatDate(updatedData.userJob.job);
      FormatDate.updateDateFromList(updatedData.userExperiences);
      FormatDate.updateDateFromList(updatedData.userTrainings);
      FormatDate.updateDateFromList(updatedData.userContracts);
      FormatDate.updateDateFromList(updatedData.userAbsences);
      FormatDate.updateDateFromList(updatedData.userInterviews);
      FormatDate.updateDateFromList(updatedData.userProfiles);
    });
  }
}

