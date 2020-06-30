import { FormRegister } from "..";

export const FORM_REGISTER: FormRegister = {
  firstName: {
    id: 'firstName',
    label: 'Prénom',
    regEx: '.',
    type: 'text',
  },
  lastName: {
    id: 'lastName',
    label: 'Nom',
    regEx: '.',
    type: 'text',
  },
  country: {
    id: 'country',
    label: 'Pays',
    regEx: '.',
    type: 'text',
  },
  phone: {
    id: 'phone',
    label: 'Téléphone',
    regEx: '^[+]?[0-9]+$',
    type: 'text',
  },
  jobPosition: {
    id: 'jobPosition',
    label: 'Fonction',
    regEx: '.',
    type: 'select',
  },
  birthDate: {
    id: 'birthDate',
    label: 'Date de naissance',
    regEx: '.',
    type: 'date',
  },
  username: {
    id: 'username',
    label: 'Email',
    regEx: '^[a-zA-Z0-9.!#$%&"*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
    type: 'email',
  },
};