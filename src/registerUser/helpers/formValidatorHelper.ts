import { InputState } from '../index.d';
import { IsFormValid } from '..';

export const formValidator = (isFormValid: IsFormValid): InputState => {
  const copyOfIsFormValid = {
    ...isFormValid,
  } as any;
  let isAllFormValid: InputState = InputState.TRUE;

  for (let key in copyOfIsFormValid) {
    isAllFormValid = isAllFormValid && copyOfIsFormValid[key];
  }

  return isAllFormValid;
};