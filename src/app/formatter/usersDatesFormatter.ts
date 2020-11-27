import { User } from '..';
import { FormatDates } from '../helpers/formatDates';

export class UsersDatesFormatter {
  public static transformDateFormat(userCollection: User[]) {
    userCollection.forEach(user => {
      UsersDatesFormatter.transformUserDateFormat(user);
    });
  }

  static fieldsWithDates: Array<keyof User> = [
    'userExperiences',
    'userTrainings',
    'userContracts',
    'userAbsences',
    'userInterviews',
    'userProfiles',
  ];

  public static transformUserDateFormat(user: User) {
    FormatDates.formatDate(user);
    if (user.userJob) {
      FormatDates.formatDate(user.userJob);
    }

    if (user.userJob && user.userJob.job) {
      FormatDates.formatDate(user.userJob.job);
    }

    UsersDatesFormatter.fieldsWithDates.map((fieldWithDates) =>
      FormatDates.updateDateFromList(user[fieldWithDates] as [any]),
    );
  }
}

