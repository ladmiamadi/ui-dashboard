import { UserProfile } from '../../app/index';

export class TalentUserProfilesFilter {
  public static funcFilter(profile: UserProfile[]) {
    return profile.filter((profile) => profile.environment === 'live');
  }
}

