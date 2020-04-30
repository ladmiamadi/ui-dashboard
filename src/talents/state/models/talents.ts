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
            lastname: 'Nom'
          },
          {
            id: 2,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 3,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 4,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 5,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 6,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 7,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 8,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 9,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 10,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 11,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 12,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 13,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 14,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 15,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
          {
            id: 16,
            photo: '',
            firstname: 'Prénom',
            lastname: 'Nom'
          },
        ];
        this.updateTalents(data);
      } catch (error) {
        (new Toastify()).error(`Something went wrong. ${ error.message }`);
      }
    }
  }
});