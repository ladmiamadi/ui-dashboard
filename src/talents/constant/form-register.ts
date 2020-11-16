import { FormRegister } from '..';

export const FORM_REGISTER: FormRegister = {
  platform: {
    id: 'platform',
    label: 'Plateforme',
    regEx: '.',
    type: 'text',
  },
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
  nationality: {
    id: 'nationality',
    label: 'Nationalité',
    regEx: '.',
    type: 'text',
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
    regEx: '^[A-Za-z0-9._-]+@[A-Za-z0-9._-]{2,}[.][A-Za-z]{2,4}$',
    type: 'email',
  },
};