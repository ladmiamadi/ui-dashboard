import { UserProfile } from '../../app';

export class TalentUserProfilesFilter {
  public static filterByEnvironment(profile: UserProfile[], environment: 'live' | 'working') {
    return { ...profile.filter((profile) => profile.environment === environment)[0] };
  }
}

