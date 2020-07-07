import { UserExperience } from '../../app';

export class UserExperienceFactory {
  public static createEmptyExperience(): UserExperience {
    return {
      company: '',
      startDate: new Date(),
      endDate: new Date(),
      position: '',
      task: '',
    };
  }
}
