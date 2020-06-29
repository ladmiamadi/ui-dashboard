import { InputType } from 'reactstrap/lib/Input';

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
  birthDate: T,
  country: T,
  jobPosition: T,
  firstName: T,
  lastName: T,
  username: T,  
  phone: T,
}

export type UserSignUp = UserRegister<string>;

export type IsFormValid = UserRegister<InputState>;

export type FormRegister = UserRegister<Field>;

interface Field {
  id: string,
  label: string,
  regEx: string,
  type: InputType,
}

export interface ObjectPropsOfInput {
  id: string,
  idValue: string,
  isInputValid: InputState,
  options?: string[],
  label: string,
  usernameCollection?: string[],
  type: InputType,
  regEx: string,
}

export interface UserSignUpPayload {
  property: string,
  value: string,
}

export interface FormValidPayload {
  property: string,
  isInputValid: boolean,
}
