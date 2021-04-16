import { UserProfile } from '../../app';

export default class ProfileCollection {
  public static filterByEnvironment(profiles: UserProfile[] | undefined, environment: string): UserProfile | undefined {
    return profiles ? { ...profiles?.filter((profile) => profile.environment === environment)[0] } : undefined;
  }

  public static findLiveIndex(profileList: UserProfile[] | undefined): number {
    return profileList ? profileList?.findIndex(profile => profile?.environment === 'live') : -1;
  }
}