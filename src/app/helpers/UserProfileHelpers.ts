import React from 'react';
import { User, UserProfile } from '../index';

export class UserProfileHelpers extends React.Component {

  private static isMatchingProfile(profile: UserProfile, searchTerm: string): boolean {
    return profile.firstName.toLocaleLowerCase().includes(searchTerm)
      || profile.lastName.toLocaleLowerCase().includes(searchTerm);
  }

  private static isMatchingProfileWithSearch(profile: UserProfile, searchTermsStr: string): boolean {
    const searhTerms = searchTermsStr.toLocaleLowerCase().split(' ');
    return searhTerms.reduce(
      (isMatchingProfileWithSearch: boolean, searchTerm: string) => isMatchingProfileWithSearch && this.isMatchingProfile(profile, searchTerm),
      true
    );
  }

  public static findUserProfileLive(user: User, searchTermsStr: string) {
    return user.userProfiles?.filter((profile) => (profile.environment === 'live' && this.isMatchingProfileWithSearch(profile, searchTermsStr)));
  }

  public static findUserProfileWorking(user: User) {
    return user.userProfiles?.filter((profile) => profile.environment === 'working');
  }

  public static isUserHaveWorkingOnValidationProfile(user: User) {
    return user.userProfiles?.filter((profile) =>
      profile.environment === 'working' && profile.status === 'ON_VALIDATION').length;
  }
}
