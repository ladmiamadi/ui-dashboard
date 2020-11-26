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
  jobPosition: {
    id: 'jobPosition',
    label: 'Fonction',
    regEx: '.',
    type: 'select',
    required: true,
  },
  username: {
    id: 'username',
    label: 'Email',
    regEx: '^[A-Za-z0-9._-]+@[A-Za-z0-9._-]{2,}[.][A-Za-z]{2,4}$',
    type: 'email',
    required: true,
  },
  phone: {
    id: 'phone',
    label: 'Téléphone',
    regEx: '^[+]?[0-9]+$',
    type: 'text',
  },
  recrutementSection: {
    id: 'recrutementSection',
    label: 'Recrutement',
    regEx: '.',
    type: 'text',
    isSectionTitle: true,
  },
  platform: {
    id: 'platform',
    label: 'Plateforme',
    regEx: '.',
    type: 'text',
    required: true,
  },
  recruitmentTray: {
    id: 'recruitmentTray',
    label: 'Boîte e-mail',
    regEx: '.',
    type: 'select',
    required: true,
  },
  recruitmentComments: {
    id: 'recruitmentComments',
    label: 'Commentaires sur le recrutement',
    regEx: '.',
    type: 'text',
    required: true,
  },
  institutionSection: {
    id: 'institutionSection',
    label: 'Institution',
    regEx: '.',
    type: 'text',
    isSectionTitle: true,
  },
  institution: {
    id: 'institution',
    label: 'École',
    regEx: '.',
    type: 'text',
    required: true,
  },
  emailInstitution: {
    id: 'emailInstitution',
    label: 'Email École',
    regEx: '^[A-Za-z0-9._-]+@[A-Za-z0-9._-]{2,}[.][A-Za-z]{2,4}$',
    type: 'text',
    required: true,
  },
  phoneInstitution: {
    id: 'phoneInstitution',
    label: 'Téléphone École:',
    regEx: '.',
    type: 'text',
    required: true,
  },
  personContactInstitution: {
    id: 'personContactInstitution',
    label: 'Personne de contact',
    regEx: '.',
    type: 'text',
    required: true,
  },
};