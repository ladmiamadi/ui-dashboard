import { UserExperience } from '../../app';

export class UserExperienceFactory {
  public static createEmptyExperience(): UserExperience {
    return {
      company: '',
      startDate: null,
      endDate: null,
      position: '',
      task: '',
    };
  }
}
