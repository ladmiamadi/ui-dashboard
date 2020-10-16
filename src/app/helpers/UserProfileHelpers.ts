import React from 'react';
import { User } from '../index';

export class UserProfileHelpers extends React.Component {
  public static findUserProfileLive(user: User, searchTerm: string) {
    return user.userProfiles?.filter((profile) => (profile.environment === 'live' &&
        (profile.firstName.includes(searchTerm) || profile.lastName.includes(searchTerm))));
  }

  public static findUserProfileWorking(user: User) {
    return user.userProfiles?.filter((profile) => profile.environment === 'working');
  }

  public static isUserHaveWorkingOnValidationProfile(user: User) {
    return user.userProfiles?.filter((profile) =>
      profile.environment === 'working' && profile.status === 'ON_VALIDATION').length;
  }
}
