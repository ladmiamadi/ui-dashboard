import { User, UserAddress, UserProfile } from '../../app/index.d';
import { UserSignUp } from '../state/models/userSignUp';

export const createEmptyUser = (): User => {
  const userAddress: UserAddress = {
    country : '',
  };

  const userProfile: UserProfile = {
    birthDate: new Date(),
    desiredJob: '',
    environment: 'live',
    firstName: '',
    lastName: '',
    phone: '',
  };

  const user: User = {
    createdDate: new Date(),
    isActive: true,
    password: 'sosecure',
    username: '',
    userAddress: userAddress,
    userProfiles: [userProfile],
  };

  return user;
};

export const createUserIntern = (userSignUp: UserSignUp): User => {
  const userAddress: UserAddress = {
    country : userSignUp.country,
  };

  const userProfile: UserProfile = {
    birthDate: new Date(userSignUp.birthDate),
    desiredJob: userSignUp.desiredJob,
    environment: 'live',
    firstName: userSignUp.firstName,
    lastName: userSignUp.lastName,
    phone: userSignUp.phone,
  };

  const user: User = {
    createdDate: new Date(),
    isActive: true,
    password: 'sosecure',
    username: userSignUp.username,
    userAddress: userAddress,
    userProfiles: [userProfile],
  };

  return user;
};