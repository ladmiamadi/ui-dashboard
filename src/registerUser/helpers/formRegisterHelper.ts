import { FormRegister, IsFormValid, UserSignUp } from '../index.d';
import { Toastify } from '../../helpers/Toastify';
import { Job } from '../../app';
import { FORM_REGISTER } from '../constant/FormRegister';
import { Props as FormRegisterProps } from '../components/form/FormRegisterUser';
import { PropsForInput } from '..';

export const isUsernameAlreadyExists = (idValue: string, usernameCollection?: string[]): boolean => {
  const isUsernameUnique = !usernameCollection?.includes(idValue);

  if (!isUsernameUnique) {
    (new Toastify()).error(idValue + ' already exists in the database');
  }

  return isUsernameUnique;
};

const createField = (props: FormRegisterProps, property: string): PropsForInput => ({
  ...FORM_REGISTER[property as keyof FormRegister],
  isInputValid: props.isFormValid[property as keyof IsFormValid],
  idValue: props.userSignUp[property as keyof UserSignUp],
  updateUserSignUp: props.updateUserSignUp,
  setIsFormValid: props.setIsFormValid,
});

export const doubleArrayPropsInput = (
  props: FormRegisterProps,
): PropsForInput[][] => {
  const jobPosition = props.jobCollection.map((job: Job) => job.position);

  return ([
    [
      createField(props, 'firstName'),
      createField(props, 'lastName'),
    ],
    [
      createField(props, 'country'),
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
