import { InputState } from './../components/registerUser/index.d';
import { IsFormValid } from './../state/models/userSignUp';
export const formValidator = (isFormValid: IsFormValid): InputState => {
  let isAllFormValid: InputState = InputState.TRUE;

  const copyOfIsFormValid = {
    ...isFormValid,
  } as any;

  for(let key in copyOfIsFormValid){
    isAllFormValid = isAllFormValid && copyOfIsFormValid[key];
  }

  if(isAllFormValid === InputState.UNDEFINED){
    isAllFormValid = InputState.FALSE;
  }

  return isAllFormValid;
};