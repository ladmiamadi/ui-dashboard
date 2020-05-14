import { User } from '../../index';
import { Toastify } from '../../../helpers/Toastify';
import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';

type TalentsState = {
  list: User[]
}

export const talents = createModel ({
  state: {
    list: []
  } as TalentsState,
  reducers: {
    updateTalents: (state: TalentsState, payload: User[]): TalentsState => ({ ...state, list: payload })
  },
  effects: {
    async fetchTalents() {
      try {
        const { data } = await apiService.get('/api/users');
        console.log(data);
        //const { users } = data['hydra:member'];
        //console.log(users);
        this.updateTalents(data);
      } catch (error) {
        (new Toastify()).error(`Something went wrong. ${ error.message }`);
      }
    }
  }
});
