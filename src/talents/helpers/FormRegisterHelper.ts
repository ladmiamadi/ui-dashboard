import { PropsForInput, UserRegister } from '..';
import { Job } from '../../app';
import { Toastify } from '../../helpers/Toastify';
import { Props as FormRegisterProps } from '../components/add-new-talent/form/FormRegisterUser';
import { FORM_REGISTER } from '../constant/form-register';
import { RECRUITMENT_TRAY_OPTIONS } from '../constants/recruitment-tray-options';

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
      createField(props, 'firstName'),
      createField(props, 'lastName'),
    ],
    [
      {
        ...createField(props, 'jobPosition'),
        options: jobPosition,
      },
      {
        ...createField(props, 'username'),
        usernameCollection: props.usernameCollection,
      },
    ],
    [
      createField(props, 'phone'),
    ],
    [
      createField(props, 'recrutementSection'),
    ],
    [
      createField(props, 'platform'),
      {
        ...createField(props, 'mailboxHR'),
        options: RECRUITMENT_TRAY_OPTIONS,

      },
    ],
    [
      createField(props, 'recruitmentComments'),
    ],
    [
      createField(props, 'institutionSection'),
    ],
    [
      createField(props, 'institution'),
      {
        ...createField(props, 'emailInstitution'),
        usernameCollection: props.usernameCollection,
      },
    ],
    [
      createField(props, 'phoneInstitution'),
      createField(props, 'personContactInstitution'),
    ],
  ]);
};
