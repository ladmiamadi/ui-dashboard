import { InputState } from '../index.d';
import { IsFormValid } from '..';

export const formValidator = (isFormValid: IsFormValid): InputState => {
  const copyOfIsFormValid: IsFormValid = {
    ...isFormValid,
  };
  let isAllFormValid: InputState = InputState.TRUE;

  for (let key in copyOfIsFormValid) {
    isAllFormValid = isAllFormValid && copyOfIsFormValid[key as keyof IsFormValid];
  }

  return isAllFormValid;
};