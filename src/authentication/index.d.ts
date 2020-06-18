import { InputType } from 'reactstrap/lib/Input';

export interface AuthAttributes {
  id: string,
  label: string,
  placeholder: string,
  type: InputType,
  value: string,
}