import { InputType } from 'reactstrap/lib/Input';

export interface PropsForInputWithoutFunc {
  type: InputType,
  label: string,
  id: 'username' | 'email' | 'password',
  defaultValue?: string,
  placeholder?: string,
  options?: string[],
}

export const ARRAY_OF_ADMIN_USERNAMES = ['Quentin', 'David', 'Antonio', 'Guest'];