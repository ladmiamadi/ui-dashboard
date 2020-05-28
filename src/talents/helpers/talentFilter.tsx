import { UserExperience, UserProfile } from '../../app/index';

export class TalentUserProfilesFilter {
  public static funcFilter(profile: UserProfile[]) {
    return profile.filter((profile) => profile.environment === 'live');
  }
}

export class TalentUserExperiencesFilter {
  public static funcFilter(profile: UserExperience[]) {
    return profile.filter((profile) => profile);
  }
}

/*export class TalentUserExperiencesFilter {
  public static funcFilter(profile: UserExperience[]) {
    return profile.filter((profile) => profile.company);
  }
}*/
