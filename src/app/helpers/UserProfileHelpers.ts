import { env } from '../../helpers/environment';
import { POSITIONS } from '../../talents/index.d';
import { OptionValue } from '../components/utils/OptionList';
import { User, UserProfile } from '../index';

const DEFAULT_AVATAR_IMG = '/default_avatar.png';

export class UserProfileHelpers {
  private static isMatchingProfile(profile: UserProfile, searchTerm: string): boolean {
    return profile.firstName.toLocaleLowerCase().includes(searchTerm)
      || profile.lastName.toLocaleLowerCase().includes(searchTerm)
      || profile.email.toLocaleLowerCase().includes(searchTerm)
      || (profile.position || '').toLocaleLowerCase().includes(searchTerm);
  }

  private static isMatchingProfileWithSearch(profile: UserProfile, searchTermsStr: string): boolean {
    const searhTerms = searchTermsStr.toLocaleLowerCase().split(' ');

    return searhTerms.reduce(
      (isMatchingProfileWithSearch: boolean, searchTerm: string) => isMatchingProfileWithSearch &&
        this.isMatchingProfile(profile, searchTerm),
      true);
  }

  public static findUserProfileLive(user: User, searchTermsStr: string): UserProfile[] | undefined {
    return user.userProfiles?.filter((profile) => (profile.environment === 'live' &&
      this.isMatchingProfileWithSearch(profile, searchTermsStr)));
  }

  public static findUserProfileWorking(user: User): UserProfile[] | undefined {
    return user.userProfiles?.filter((profile) => profile.environment === 'working');
  }

  public static isUserHaveWorkingOnValidationProfile(user: User): number | undefined {
    return user.userProfiles?.filter((profile) =>
      profile.environment === 'working' && profile.status === 'ON_VALIDATION').length;
  }

  public static getUserProfilePictureUrl(userProfile?: UserProfile): string {
    return env('MEDIA_URL')
      + (userProfile && userProfile.picture
        ? `${userProfile.picture.filePath}`
        : DEFAULT_AVATAR_IMG);
  }

  public static getFullNameFromUser(user: User): string {
    if (!user.userProfiles) {
      return user.username;
    }

    const userProfileLive = user.userProfiles.find(up => up.environment === 'live');

    return (userProfileLive)
      ? userProfileLive.firstName + ' ' + userProfileLive.lastName
      : user.username;
  }

  public static buildOptionValueFromUser(user: User): OptionValue {
    return {
      label: this.getFullNameFromUser(user),
      value: user.username,
    };
  }

  public static isHR(user: User): unknown {
    if (!user.userProfiles) {
      return '';
    }

    const userProfileLive = user.userProfiles.find(up => up.environment === 'live');

    return userProfileLive?.position === POSITIONS.RH.toString();
  }
}
