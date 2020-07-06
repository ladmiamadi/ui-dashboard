import { UserTraining } from '../../app';

export class UserTrainingFactory {
  public static createEmptyUserTraining(): UserTraining {
    return {
      institution: '',
      startDate: new Date(),
      endDate: new Date(),
      degreeObtained: '',
    }
  }
}