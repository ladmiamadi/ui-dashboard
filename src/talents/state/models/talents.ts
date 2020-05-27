import { Toastify } from '../../../helpers/Toastify';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';

interface State {
  list: User[]
}

export const talents = createModel ({
  state: {
    list: []
  } as State,
  reducers: {
    updateList: (state: State, payload: User[]): State => ({ ...state, list: payload })
  },
  effects: {
    async fetchTalents() {
      try {
        const { data } = await apiService.get('/api/users');
        this.updateList(data);
      } catch (error) {
        (new Toastify()).error(`Something went wrong. ${ error.message }`);
      }
    }
  }
});
