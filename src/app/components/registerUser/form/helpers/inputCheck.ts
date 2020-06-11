export const checkInputInvalidity = (isInputValid: boolean | undefined) => {
  const invalid = (isInputValid === false && isInputValid !== undefined);
  return invalid;
};

export const checkRegEx = (idValue: string, regEx: string) => {
  const checkRegExp = new RegExp(regEx);
  const isInputValid = checkRegExp.test(idValue);
  return isInputValid;
};