import { InputState, IsFormValid, UserSignUp } from '../index.d';

export const createEmptyUserSignUp = (): UserSignUp => ({
  birthDate: '2000-01-01',
  country: '',
  jobPosition: '',
  firstName: '',
  lastName: '',
  username: '',  
  phone: '',
});

export const createEmptyIsFormValid = (): IsFormValid => ({  
  birthDate: InputState.UNDEFINED,
  country: InputState.UNDEFINED,
  jobPosition: InputState.UNDEFINED,
  firstName: InputState.UNDEFINED,
  lastName: InputState.UNDEFINED,
  username: InputState.UNDEFINED,
  phone: InputState.UNDEFINED,
});
