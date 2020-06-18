import { User, UserAddress, UserProfile } from '../../app/index.d';

export const createEmptyUser = (): User => {
  const userAddress = {
    country : '',
  } as UserAddress;

  const userProfile = {
    birthDate: new Date(),
    desiredJob: '',
    environment: 'live',
    firstName: '',
    lastName: '',
    mailInstitution: '',
    phone: '',
  } as UserProfile;

  const user = {
    createdDate: new Date(),
    isActive: true,
    password: 'sosecure',
    username: '',
    userAddress: userAddress,
    userProfiles: [userProfile],
  } as User;

  return user;
};