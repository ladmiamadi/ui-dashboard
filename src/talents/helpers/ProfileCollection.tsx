import { UserProfile } from '../../app';

export default class ProfileCollection {
  // eslint-disable-next-line max-len
  public static filterByEnvironment(profileList: UserProfile[] | undefined, environment: string): UserProfile | undefined {
    return profileList ? { ...profileList?.filter((profile) => profile.environment === environment)[0] } : undefined;
  }

  public static findWorkingIndex(profileList: UserProfile[] | undefined): number {
    return profileList ? profileList?.findIndex(profile => profile?.environment === 'working') : -1;
  } 
}