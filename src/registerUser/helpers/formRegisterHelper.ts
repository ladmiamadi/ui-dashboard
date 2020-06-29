import { ObjectPropsOfInput, InputState, FormRegister } from '../index.d';
import { Toastify } from '../../helpers/Toastify';
import { UserSignUp, IsFormValid } from '..';
import { Job } from '../../app';
import { FORM_REGISTER } from '../constant/FormRegister';

export const isUsernameAlreadyExists = (idValue: string, usernameCollection?: string[]): boolean => {
  let isUsernameUnique = true;

  usernameCollection && usernameCollection.map(username => {
    if (username === idValue) {
      (new Toastify()).error(idValue + ' already exists in the database');

      isUsernameUnique = false;
    }

    return username;
  });

  return isUsernameUnique;
};

const createField = (isInputValid: InputState, idValue: string, property: keyof FormRegister): ObjectPropsOfInput => ({
  ...FORM_REGISTER[property],
  isInputValid,
  idValue,
});

export const doubleArrayObjectOfPropsInput = (
  isFormValid: IsFormValid,
  usernameCollection: string[],
  userSignUp: UserSignUp,
  jobCollection: Job[],
): ObjectPropsOfInput[][] => {
  const jobPosition = jobCollection.map((job: Job) => job.position);

  return ([
    [
      createField(isFormValid.firstName, userSignUp.firstName, 'firstName'),
      createField(isFormValid.lastName, userSignUp.lastName, 'lastName'),
    ],
    [
      createField(isFormValid.country, userSignUp.country, 'country'),
      createField(isFormValid.phone, userSignUp.phone, 'phone'),
    ],
    [
      {
        ...createField(isFormValid.jobPosition, userSignUp.jobPosition, 'jobPosition'),
        options: jobPosition,
      },
      createField(isFormValid.birthDate, userSignUp.birthDate, 'birthDate'),
    ],
    [
      {
        ...createField(isFormValid.username, userSignUp.username, 'username'),
        usernameCollection: usernameCollection,
      },
    ],
  ]);
};
