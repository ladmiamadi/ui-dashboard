import { User } from '../../app';
import { UsersDatesFormatter } from '../../app/formatter/usersDatesFormatter';

export class UserAdapterHelper {
  static postprocessUser(user: User): User {
    UsersDatesFormatter.transformUserDateFormat(user);

    if (user.userAddress == null) {
      user.userAddress = {};
    }

    return user;
  }

  static postprocessUsers(users: User[]): User[] {
    return users.map(user => UserAdapterHelper.postprocessUser(user));
  }
}