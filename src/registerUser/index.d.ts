import { InputType } from 'reactstrap/lib/Input';

export enum InputState {
  TRUE = true,
  FALSE = false,
  UNDEFINED = undefined,
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

