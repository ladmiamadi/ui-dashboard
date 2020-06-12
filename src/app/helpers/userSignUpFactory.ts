import { User } from './../index.d';
import { IsFormValid } from './../state/models/userSignUp';
import { UserSignUp } from '../state/models/userSignUp';
import { createEmptyUser } from './userFactory';
import { InputState } from '../components/registerUser/index.d';

export const createEmptyUserSignUp = (): UserSignUp => ({
  birthDate: '2000-01-01',
  country: '',
  desiredJob: '',
  firstName: '',
  lastName: '',
  mailInstitution: '',  
  phone: '',
});

export const createEmptyIsFormValid = (): IsFormValid => ({  
  birthDate: InputState.UNDEFINED,
  country: InputState.UNDEFINED,
  desiredJob: InputState.UNDEFINED,
  firstName: InputState.UNDEFINED,
  lastName: InputState.UNDEFINED,
  mailInstitution: InputState.UNDEFINED,
  phone: InputState.UNDEFINED,
});

export const createDtoUserSignUp = (userSignUp: UserSignUp): User => {
  const emptyUser = createEmptyUser() as User;

  const userSentInDb = {
    ...emptyUser,
  };

  const { 
    birthDate, 
    country, 
    desiredJob, 
    firstName, 
    lastName, 
    mailInstitution, 
    phone, 
  } = userSignUp;

  userSentInDb.username = mailInstitution;
  userSentInDb.userAddress.country = country;
  userSentInDb.userProfiles[0].birthDate = new Date(birthDate);
  userSentInDb.userProfiles[0].desiredJob = desiredJob;
  userSentInDb.userProfiles[0].firstName = firstName;
  userSentInDb.userProfiles[0].lastName = lastName;
  userSentInDb.userProfiles[0].mailInstitution = mailInstitution;
  userSentInDb.userProfiles[0].phone = phone;

  return userSentInDb;
};
