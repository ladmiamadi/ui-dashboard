import { User } from './../index.d';
import { IsFormValid } from './../state/models/userSignUp';
import { UserSignUp } from '../state/models/userSignUp';
import { createEmptyUser } from './userFactory';

export const createEmptyUserSignUp = (): UserSignUp => ({
  firstName: '',
  lastName: '',
  country: '',
  phone: '',
  desiredJob: '',
  birthDate: '2000-01-01',
  mailInstitution: '',  
});

export const createEmptyIsFormValid = (): IsFormValid => ({  
  firstName: undefined,
  lastName: undefined,
  country: undefined,
  phone: undefined,
  desiredJob: undefined,
  birthDate: undefined,
  mailInstitution: undefined,
});

export const createDtoUserSignUp = (userSignUp: UserSignUp): User => {
  const emptyUser = createEmptyUser() as User;

  const userSentInDb = {
    ...emptyUser,
  };

  const { 
    firstName, 
    lastName, 
    country, 
    phone, 
    desiredJob, 
    birthDate, 
    mailInstitution, 
  } = userSignUp;

  userSentInDb.username = mailInstitution;
  userSentInDb.userAddress.country = country;
  userSentInDb.userProfiles[0].firstName = firstName;
  userSentInDb.userProfiles[0].lastName = lastName;
  userSentInDb.userProfiles[0].phone = phone;
  userSentInDb.userProfiles[0].mailInstitution = mailInstitution;
  userSentInDb.userProfiles[0].desiredJob = desiredJob;
  userSentInDb.userProfiles[0].birthDate = new Date(birthDate);

  return userSentInDb;
};
