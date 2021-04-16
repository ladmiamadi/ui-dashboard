import { InputState } from '../index.d';

type FormValidGuard<T> = {
  [P in keyof T]: InputState;
};

export class FormValidator {
  public static isAllFieldValidated = <T>(isFormValid: FormValidGuard<T>): boolean => {
    const copyOfIsFormValid: FormValidGuard<T> = {
      ...isFormValid,
    };
    let isAllFormValid = true;
    let key: keyof FormValidGuard<T>;
  
    for (key in copyOfIsFormValid) {
      isAllFormValid = isAllFormValid && (copyOfIsFormValid[key] === InputState.TRUE);
    }
  
    return isAllFormValid;
  }
}
