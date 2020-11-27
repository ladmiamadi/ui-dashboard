import { InputState, IsFormValid, UserSignUp } from '../index.d';

export const createEmptyUserSignUp = (): UserSignUp => ({

  firstName: '',
  lastName: '',
  jobPosition: '',
  username: '',
  recrutementSection: '',
  platform: '',
  recruitmentComments: '',
  mailboxHR: '',
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
  recrutementSection: InputState.TRUE,
  platform: InputState.UNDEFINED,
  recruitmentComments: InputState.UNDEFINED,
  mailboxHR: InputState.UNDEFINED,
  institutionSection: InputState.TRUE,
  institution: InputState.UNDEFINED,
  emailInstitution: InputState.UNDEFINED,
  phoneInstitution: InputState.UNDEFINED,
  personContactInstitution: InputState.UNDEFINED,
});