import { User, UserAddress, UserProfile } from './../index.d';

export const createEmptyUser = (): User => {
  const userAddress = {
    country : '',
  } as UserAddress;

  const userProfile = {
    environment: 'live',
    firstName: '',
    lastName: '',
    phone: '',
    mailInstitution: '',
    birthDate: new Date(),
    desiredJob: '',
  } as UserProfile;

  const user = {
    username: '',
    password: 'sosecure',
    isActive: true,
    createdDate: new Date(),
    userAddress: userAddress,
    userProfiles: [userProfile],
  } as unknown as User;

  return user;
};