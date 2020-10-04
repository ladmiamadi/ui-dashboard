import { InputState, IsFormValid } from '../index.d';

export const formValidator = (isFormValid: IsFormValid): InputState => {
  const copyOfIsFormValid: IsFormValid = {
    ...isFormValid,
  };
  let isAllFormValid: InputState = InputState.TRUE;
  let key: keyof IsFormValid;

  for (key in copyOfIsFormValid) {
    isAllFormValid = isAllFormValid && copyOfIsFormValid[key];
  }

  return isAllFormValid;
};