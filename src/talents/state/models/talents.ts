import { Toastify } from '../../../helpers/Toastify';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';

interface State {
  list: User[],
  isFetching: boolean,
}

export const talents = createModel ({
  state: {
    list: [],
    isFetching: false,
  } as State,
  reducers: {
    updateList: (state: State, list: User[]): State => ({ ...state, list }),
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
  },
  effects: {
    async fetchTalents() {
      try {
        this.setIsFetching(true);
        const { data } = await apiService.get('/api/users');
        this.updateList(data);
      } catch (error) {
        (new Toastify()).error(`Something went wrong. ${ error.message }`);
      } finally {
        this.setIsFetching(false);
      }
    },
  },
});
