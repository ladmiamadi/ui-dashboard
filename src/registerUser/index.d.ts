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
  id: keyof UserRegister<T>,
  label: string,
  regEx: string,
  type: InputType,
}

export interface ObjectPropsOfInput {
  
}

export interface UserSignUpPayload {
  property: keyof UserRegister<T>,
  value: string,
}

export interface FormValidPayload {
  property: keyof UserRegister<T>,
  isInputValid: InputState,
}

export interface PropsForInput{
  id: keyof UserRegister<T>,
  idValue: string,
  isInputValid: InputState,
  options?: string[],
  label: string,
  usernameCollection?: string[],
  type: InputType,
  regEx: string,
  updateUserSignUp: (property: keyof UserRegister<T>, idValue: string) => void,
  setIsFormValid: (property: keyof UserRegister<T>, regEx: string) => void,
}
