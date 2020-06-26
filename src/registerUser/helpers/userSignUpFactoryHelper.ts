import { User } from '../../app/index.d';
import { createUserIntern } from './userFactoryHelper';
import { IsFormValid } from '../state/models/userSignUp';
import { InputState } from '../index.d';
import { UserSignUp } from '../state/models/userSignUp';

export const createEmptyUserSignUp = (): UserSignUp => ({
  birthDate: '2000-01-01',
  country: '',
  desiredJob: '',
  firstName: '',
  lastName: '',
  username: '',  
  phone: '',
});

export const createEmptyIsFormValid = (): IsFormValid => ({  
  birthDate: InputState.UNDEFINED,
  country: InputState.UNDEFINED,
  desiredJob: InputState.UNDEFINED,
  firstName: InputState.UNDEFINED,
  lastName: InputState.UNDEFINED,
  username: InputState.UNDEFINED,
  phone: InputState.UNDEFINED,
});

export const createDtoUserSignUp = (userSignUp: UserSignUp): User => createUserIntern(userSignUp);
