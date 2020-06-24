import { UserProfile } from '../../app';

export class TalentUserProfilesFilter {
  public static filterByEnvironment(profile: UserProfile[] | undefined, environment: 'live' | 'working') {
    return  profile ? { ...profile?.filter((profile) => profile.environment === environment)[0] } : undefined;
  }
}

