import { InputState, IsFormValid, UserSignUp } from '../index.d';

export const createEmptyUserSignUp = (): UserSignUp => ({
  jobPosition: '',
  firstName: '',
  platform: '',
  lastName: '',
  username: '',
  phone: '',
  recruitmentTray: '',
  recruitmentComments: '',
  institution: '',
  emailInstitution: '',
  phoneInstitution: '',
  personContactInstitution: '',

});

export const createEmptyIsFormValid = (): IsFormValid => ({
  jobPosition: InputState.UNDEFINED,
  firstName: InputState.UNDEFINED,
  platform: InputState.UNDEFINED,
  lastName: InputState.UNDEFINED,
  username: InputState.UNDEFINED,
  phone: InputState.UNDEFINED,
  recruitmentTray: InputState.UNDEFINED,
  recruitmentComments: InputState.UNDEFINED,
  institution: InputState.UNDEFINED,
  emailInstitution: InputState.UNDEFINED,
  phoneInstitution: InputState.UNDEFINED,
  personContactInstitution: InputState.UNDEFINED,
});