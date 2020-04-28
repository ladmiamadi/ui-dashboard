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
            firstname: 'Jason',
            lastname: 'Madilu'
          },
          {
            id: 2,
            photo: '',
            firstname: 'Test',
            lastname: 'Test'
          }
        ];
        this.updateTalents(data);
      } catch (error) {
        (new Toastify()).error(`Something went wrong. ${ error.message }`);
      }
    }
  }
});