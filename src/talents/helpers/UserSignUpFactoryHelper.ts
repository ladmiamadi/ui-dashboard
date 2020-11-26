import { InputState, IsFormValid, UserSignUp } from '../index.d';

export const createEmptyUserSignUp = (): UserSignUp => ({

  firstName: '',
  lastName: '',
  jobPosition: '',
  username: '',
  phone: '',
  recrutementSection: '',
  platform: '',
  recruitmentTray: '',
  recruitmentComments: '',
  institutionSection: '',
  institution: '',
  emailInstitution: '',
  phoneInstitution: '',
  personContactInstitution: '',

});

export const createEmptyIsFormValid = (): IsFormValid => ({

  firstName: InputState.UNDEFINED,
  lastName: InputState.UNDEFINED,
  jobPosition: InputState.UNDEFINED,
  username: InputState.UNDEFINED,
  phone: InputState.UNDEFINED,
  recrutementSection: InputState.TRUE, // No validation needed
  platform: InputState.UNDEFINED,
  recruitmentTray: InputState.UNDEFINED,
  recruitmentComments: InputState.UNDEFINED,
  institutionSection: InputState.TRUE, // No validation needed
  institution: InputState.UNDEFINED,
  emailInstitution: InputState.UNDEFINED,
  phoneInstitution: InputState.UNDEFINED,
  personContactInstitution: InputState.UNDEFINED,
});