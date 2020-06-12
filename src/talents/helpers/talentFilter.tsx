import { UserProfile } from '../../app/index';

export class TalentUserProfilesFilter {
  public static filterByEnvironment(profile: UserProfile[], environment: 'live' | 'working') {
    const environement = { ...profile.filter((profile) => profile.environment === environment)[0] };

    return environement;
  }
}

