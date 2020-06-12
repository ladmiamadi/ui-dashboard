import { InputType } from 'reactstrap/lib/Input';
import { InputState } from '../..';
import { Toastify } from '../../../../../helpers/Toastify';
import { UserSignUp, IsFormValid } from '../../../../state/models/userSignUp';

export const arrayOptionsPosition: string[] = ['Dev', 'SEO', 'Commercial', 'RH', 'Graphiste'];

export const isUsernameAlreadyExists = (idValue: string, listOfAllUsernameOfUsers?: string[]): boolean => {
  let isUsernameUnique = true;

  listOfAllUsernameOfUsers && listOfAllUsernameOfUsers.map(username => {
    if (username === idValue) {
      (new Toastify()).error(idValue + ' already exists in the database');

      isUsernameUnique = false;
    }
    return username;
  });

  return isUsernameUnique;
};

export interface ObjectPropsOfInput{
  id: string,
  idValue: string,
  isInputValid: InputState,
  options?: string[],
  label: string,
  listOfAllUsernameOfUsers?: string[],
  type: InputType,
  regEx: string,
}

export const doubleArrayObjectOfPropsInput = (
  isFormValid: IsFormValid,
  listOfAllUsernameOfUsers: string[],
  userSignUp: UserSignUp, 
): ObjectPropsOfInput[][] => {

  return ([
    [
      {
        id: 'firstName',
        isInputValid: isFormValid.firstName,
        idValue: userSignUp.firstName,
        label: 'Prénom',
        regEx: '.',
        type: 'text',
      },
      {
        id: 'lastName',
        isInputValid: isFormValid.lastName,
        idValue: userSignUp.lastName,
        label: 'Nom',
        regEx: '.',
        type: 'text',
      },
    ],
    [
      {
        id: 'country',
        isInputValid: isFormValid.country,
        idValue: userSignUp.country,
        label: 'Pays',
        regEx: '.',
        type: 'text',
      },
      {
        id: 'phone',
        isInputValid: isFormValid.phone,
        idValue: userSignUp.phone,
        label: 'Téléphone',
        regEx: '^[0-9]*$',
        type: 'text',
      },
    ],
    [
      {
        id: 'desiredJob',
        isInputValid: isFormValid.desiredJob,
        idValue: userSignUp.desiredJob,
        label: 'Fonction',
        options: arrayOptionsPosition,
        regEx: '.',
        type: 'select',
      },
      {
        id: 'birthDate',
        isInputValid: isFormValid.birthDate,
        idValue: userSignUp.birthDate,
        label: 'Date de naissance',
        regEx: '.',
        type: 'date',
      },
    ],
    [
      {
        id: 'mailInstitution',
        isInputValid: isFormValid.mailInstitution,
        idValue: userSignUp.mailInstitution,
        label: 'Email',
        listOfAllUsernameOfUsers: listOfAllUsernameOfUsers,
        regEx: '^[a-zA-Z0-9.!#$%&"*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
        type: 'email',
      },
    ],
  ]);
};