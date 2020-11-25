import { InputType } from 'reactstrap/lib/Input';

export enum FormatDate {
  YEAR,
  MONTH,
  DAY,
}

export enum InputState {
  TRUE = true,
  FALSE = false,
  UNDEFINED = undefined,
}

export enum LoggedUserStatus {
  ADMIN,
  HR,
  GUEST,
}

export interface UserRegister<T> {
  jobPosition: T,
  firstName: T,
  lastName: T,
  platform: T,
  username: T,
  phone: T,
  recruitmentTray: T,
  recruitmentComments: T,
  institutionSection: T,
  institution: T,
  emailInstitution: T,
  phoneInstitution: T,
  personContactInstitution: T,
}

export type UserSignUp = UserRegister<string>;

export type IsFormValid = UserRegister<InputState>;

export type FormRegister = UserRegister<Field>;

interface Field {
  id: keyof UserRegister<T>,
  label: string,
  regEx: string,
  type: InputType,
  required?: true,
  isSectionTitle?: boolean,
}

export interface UserSignUpPayload {
  property: keyof UserRegister<T>,
  value: string,
}

export interface FormValidPayload {
  property: keyof UserRegister<T>,
  isInputValid: InputState,
}

export interface PropsForInput {
  id: keyof UserRegister<T>,
  idValue: string,
  isInputValid: InputState,
  options?: string[],
  optionsMenu?: string,
  label: string,
  usernameCollection?: string[],
  type: InputType,
  regEx: string,
  required?: boolean,
  isSectionTitle?: boolean,
  updateUserSignUp: (property: keyof UserRegister<T>, idValue: string) => void,
  setIsFormValid: (property: keyof UserRegister<T>, regEx: string) => void,
}

