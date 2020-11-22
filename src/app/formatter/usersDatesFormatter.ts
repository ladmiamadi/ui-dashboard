import { User } from '..';
import { FormatDates } from '../helpers/formatDates';

export class UsersDatesFormatter {
  public static transformDateFormat(userCollection: User[]) {
    userCollection.forEach(user => {
      UsersDatesFormatter.transformUserDateFormat(user);
    });
  }

  public static transformUserDateFormat(user: User) {
    FormatDates.formatDate(user);
    if (user.userJob)
      FormatDates.formatDate(user.userJob);
    if (user.userJob && user.userJob.job)
      FormatDates.formatDate(user.userJob.job);
    FormatDates.updateDateFromList(user.userExperiences as [any]);
    FormatDates.updateDateFromList(user.userTrainings as [any]);
    FormatDates.updateDateFromList(user.userContracts as [any]);
    FormatDates.updateDateFromList(user.userAbsences as [any]);
    FormatDates.updateDateFromList(user.userInterviews as [any]);
    FormatDates.updateDateFromList(user.userProfiles as [any]);
  }
}

