import { FormRegister } from '..';

export const FORM_REGISTER: FormRegister = {
  firstName: {
    id: 'firstName',
    label: 'Prénom',
    regEx: '.',
    type: 'text',
    required: true,
  },
  lastName: {
    id: 'lastName',
    label: 'Nom',
    regEx: '.',
    type: 'text',
    required: true,
  },
  phone: {
    id: 'phone',
    label: 'Téléphone',
    regEx: '^[+]?[0-9]+$',
    type: 'text',
    required: true,
  },
  jobPosition: {
    id: 'jobPosition',
    label: 'Fonction',
    regEx: '.',
    type: 'select',
    required: true,
  },
  nationality: {
    id: 'nationality',
    label: 'Nationalité',
    regEx: '.',
    type: 'text',
    required: true,
  },
  birthDate: {
    id: 'birthDate',
    label: 'Date de naissance',
    regEx: '.',
    type: 'date',
    required: true,
  },
  username: {
    id: 'username',
    label: 'Email',
    regEx: '^[A-Za-z0-9._-]+@[A-Za-z0-9._-]{2,}[.][A-Za-z]{2,4}$',
    type: 'email',
    required: true,
  },
  platform: {
    id: 'platform',
    label: 'Plateforme',
    regEx: '.',
    type: 'text',
    required: true,
  },
};