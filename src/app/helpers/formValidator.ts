import { InputState } from './../components/registerUser/index.d';
import { IsFormValid } from './../state/models/userSignUp';

export const formValidator = (isFormValid: IsFormValid): InputState => {
  const copyOfIsFormValid = {
    ...isFormValid,
  } as any;
  let isAllFormValid: InputState = InputState.TRUE;

  for (let key in copyOfIsFormValid) {
    isAllFormValid = isAllFormValid && copyOfIsFormValid[key];
  }

  if (isAllFormValid === InputState.UNDEFINED) {
    isAllFormValid = InputState.FALSE;
  }

  return isAllFormValid;
};