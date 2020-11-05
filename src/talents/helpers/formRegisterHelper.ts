import { FORM_REGISTER } from '../constant/FormRegister';
import { Job } from '../../app';
import { Props as FormRegisterProps } from '../components/add-new-talent/form/FormRegisterUser';
import { PropsForInput, UserRegister } from '..';
import { Toastify } from '../../helpers/Toastify';

export const isUsernameAlreadyExists = (idValue: string, usernameCollection?: string[]): boolean => {
  const isUsernameUnique = !usernameCollection?.includes(idValue);

  if (!isUsernameUnique) {
    (new Toastify()).error(idValue + ' already exists in the database');
  }

  return isUsernameUnique;
};

const createField = <T>(props: FormRegisterProps, property: keyof UserRegister<T>): PropsForInput => ({
  ...FORM_REGISTER[property],
  idValue: props.userSignUp[property],
  isInputValid: props.isFormValid[property],
  setIsFormValid: props.setIsFormValid,
  updateUserSignUp: props.updateUserSignUp,
});

export const doubleArrayPropsInput = (
  props: FormRegisterProps,
): PropsForInput[][] => {
  const jobPosition = props.jobCollection.map((job: Job) => job.position);

  return ([
    [
      createField(props, 'platform'),
      createField(props, 'firstName'),
      createField(props, 'lastName'),
    ],
    [
      createField(props, 'nationality'),
      createField(props, 'phone'),
    ],
    [
      {
        ...createField(props, 'jobPosition'),
        options: jobPosition,
      },
      createField(props, 'birthDate'),
    ],
    [
      {
        ...createField(props, 'username'),
        usernameCollection: props.usernameCollection,
      },
    ],
  ]);
};
