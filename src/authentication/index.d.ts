import { InputType } from 'reactstrap/lib/Input';

export interface PropsForInputWithoutFunc {
  id: string,
  label: string,
  placeholder: string,
  type: InputType,
}