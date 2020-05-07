import { Talent } from '../../index';
import { Toastify } from '../../../helpers/Toastify';
import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';

type TalentsState = {
  list: Talent[]
}

export const talents = createModel ({
  state: {
    list: []
  } as TalentsState,
  reducers: {
    updateTalents: (state: TalentsState, payload: Talent[]): TalentsState => ({ ...state, list: payload })
  },
  effects: {
    async fetchTalents() {
      try {
        const data = [
          {
            id: 1,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: true
          },
          {
            id: 2,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 3,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 4,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 5,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 6,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 7,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 8,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 9,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 10,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 11,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 12,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 13,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 14,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 15,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
          {
            id: 16,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom',
            validationRequest: false
          },
        ];
        this.updateTalents(data);
      } catch (error) {
        (new Toastify()).error(`Something went wrong. ${ error.message }`);
      }
    }
  }
});